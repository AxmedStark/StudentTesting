// answerController.js

import { AnswerModel } from "../models/AnswerModel.js";

// Create a new answer
export const createAnswer = async (req, res) => {
  try {
    const { questionId, title, isCorrect } = req.body;

    // Create a new answer document
    const newAnswer = new AnswerModel({
      questionId,
      title,
      isCorrect,
    });

    // Save the answer to the database
    await newAnswer.save();

    res.status(201).json({ message: "Answer created successfully", answer: newAnswer }); 
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get an answer by its ID
export const getAnswer = async (req, res) => {
  try {
    const answerId = req.params.answerId;

    // Find the answer by ID
    const answer = await AnswerModel.findById(answerId);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json({ answer });
  } catch (error) {
    console.error("Error fetching answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all answers
export const getAllAnswers = async (req, res) => {
  try {
    // Find all answers
    const answers = await AnswerModel.find();

    res.json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an answer by its ID
export const updateAnswer = async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const { title, isCorrect } = req.body;

    // Find the answer by ID and update its properties
    const updatedAnswer = await AnswerModel.findByIdAndUpdate(
      answerId,
      { title, isCorrect },
      { new: true }
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json({ message: "Answer updated successfully", answer: updatedAnswer });
  } catch (error) {
    console.error("Error updating answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an answer by its ID
export const deleteAnswer = async (req, res) => {
  try {
    const answerId = req.params.answerId;

    // Find the answer by ID and remove it
    const deletedAnswer = await AnswerModel.findByIdAndRemove(answerId);

    if (!deletedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.json({ message: "Answer deleted successfully", answer: deletedAnswer });
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
// Helper function to generate JWT token
const generateToken = (answerId) => {
  const token = jwt.sign({ id: answerId }, "secret");
  return token;
}; 
