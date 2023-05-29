import { QuestionModel } from "../models/QuestionModel.js";

// Create a new question
const createQuestion = async (req, res) => {
  const { examId, question, options, correctOption } = req.body;
  try {
    const newQuestion = new QuestionModel({
      examId,
      question,
      options,
      correctOption,
    });
    await newQuestion.save();
    res.json({ message: "Question created successfully", question: newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific question
const getQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ question });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { question, options, correctOption } = req.body;
  try {
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      questionId,
      { question, options, correctOption },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question updated successfully", question: updatedQuestion });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Delete a question
const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createQuestion, getQuestion, updateQuestion, deleteQuestion };
