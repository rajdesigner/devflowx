  
import { Schema, models, model, Types } from "mongoose";

export interface IAnswer{
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upVotes?: number;
  downVotes?: number;
}

const ModelSchema = new Schema<IAnswer>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true},
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true},
  content: { type: String, required: true},
  upVotes:{type: Number},
  downVotes: {type: Number}
}, {
  timestamps: true
})

const Answer = models?.Answer || model<IAnswer>("Answer", ModelSchema);

export default Answer;