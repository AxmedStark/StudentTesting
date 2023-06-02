import mongoose, { Schema } from "mongoose"; 

const answerSchema = new mongoose.Schema(
{
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question", 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  }
},
{
  collection: "answers" 
}); 

const AnswerModel = mongoose.model("Answer", answerSchema); 
  
export { AnswerModel }; 