import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
});

const QuestionModel = mongoose.model("Question", questionSchema);

export { QuestionModel };
