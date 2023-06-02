import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true, 
  }
},
{
  collection: "questions"
});

const QuestionModel = mongoose.model("Question", questionSchema);

export { QuestionModel };
