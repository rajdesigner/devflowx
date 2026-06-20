import { Schema, Types, models, model } from "mongoose";

export interface IQuestion{
  title: string;
  content: string;  
  tags: Types.ObjectId[];
  views: number;
  upVotes: number;
  downVotes: number;
  answers: number;
  authors: Types.ObjectId,
}

const QuestionSchema = new Schema<IQuestion>({
  title: {type: String, required: true},
  content: { type: String, required: true},
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tags"
  }],
  views: {type: Number, default: 0},
  upVotes: {type: Number, default: 0},
  answers: {type: Number, default: 0},
  authors: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {
  timestamps: true
})

const Question = models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;