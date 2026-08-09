import mongoose, { Mongoose } from "mongoose";
import { RequestError } from "./http-errors";
import logger from "./logger";

interface MongooseCache{
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null
}

declare global{
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache
}

let cached = global.mongoose;

if(!cached){
  cached = global.mongoose = { conn: null, promise: null}
}

const redactMongoUri = (uri: string) => {
  try {
    const parsedUri = new URL(uri);

    if (parsedUri.username) parsedUri.username = "***";
    if (parsedUri.password) parsedUri.password = "***";

    return parsedUri.toString();
  } catch {
    return "[invalid MongoDB URI]";
  }
};

const getMongoDbUri = () => {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new RequestError(500, "MONGODB_URI is not defined");
  }

  let parsedUri: URL;

  try {
    parsedUri = new URL(uri);
  } catch {
    throw new RequestError(500, "MONGODB_URI is not a valid MongoDB connection string");
  }

  if (!["mongodb:", "mongodb+srv:"].includes(parsedUri.protocol)) {
    throw new RequestError(500, "MONGODB_URI must start with mongodb:// or mongodb+srv://");
  }

  if (parsedUri.protocol === "mongodb+srv:" && !parsedUri.hostname.includes(".")) {
    throw new RequestError(
      500,
      `MONGODB_URI has an invalid Atlas host: ${parsedUri.hostname}. Use the full cluster host, for example cluster0.xxxxx.mongodb.net`
    );
  }

  return uri;
};

const dbConnect = async():Promise<Mongoose> => {
  if(cached.conn){
    logger.info('Using existing mongoose connection');
    return cached.conn;
  } 

  if(!cached.promise){
    const mongoDbUri = getMongoDbUri();

    cached.promise = mongoose.connect(mongoDbUri, {
      dbName: 'devflow'
    }).then((result)=>{
      logger.info('connected to Mongodb');
      return result;
    }).catch((error) => {
      cached.promise = null;
      logger.error({ err: error, uri: redactMongoUri(mongoDbUri) }, "Error connecting to MongoDB");
      throw error;
    })
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
