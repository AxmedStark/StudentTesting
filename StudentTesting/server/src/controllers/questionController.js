import { QuestionModel } from "../models/QuestionModel.js";

// Create a new question
export const createQuestion = async (req, res) => {
  const { subjectId, title, difficulty } = req.body;

  try {
    const newQuestion = new QuestionModel({ subjectId, title, difficulty });
    await newQuestion.save();
    res.json({ message: "Question created successfully", question: newQuestion });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a question by questionId
export const getQuestion = async (req, res) => {
  const questionId = req.params.questionId;

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

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const updatedQuestion = req.body;

  try {
    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updatedQuestion,
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json({ message: "Question updated successfully", question });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

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

// Helper function to generate JWT token
const generateToken = (questionId) => {
  const token = jwt.sign({ id: questionId }, "secret");
  return token;
}; 