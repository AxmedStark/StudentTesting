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
  
// Get the correct answer from an array of answers
export const getCorrectAnswerFromArray = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const answers = req.body.answers;
    console.log(req);
    console.log(answers);


    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers format. Expected an array." });
    }

    // Filter the answers based on the questionId
    const filteredAnswers = answers.filter((answer) => answer._id === questionId);

    if (filteredAnswers.length === 0) {
      return res.status(404).json({ message: "Answers not found for the given question ID" });
    }

    // Find the correct answer from the filtered answers
    const correctAnswer = filteredAnswers.find((answer) => answer.isCorrect);
 
    if (!correctAnswer) {
      return res.status(404).json({ message: "Correct answer not found for the given question ID" });
    }

    // Return the correct answer
    res.json({ correctAnswer });
  } catch (error) {
    console.error("Error finding correct answer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Calculate total score of correct answers
export const calculateTotalScore = async (req, res) => {
  try {
    const correctAnswers = await AnswerModel.find({ isCorrect: true });

    const totalScore = correctAnswers.length;

    res.json({ totalScore });
  } catch (error) {
    console.error("Error calculating total score:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; 

// Helper function to generate JWT token
const generateToken = (answerId) => {
  const token = jwt.sign({ id: answerId }, "secret");
  return token;
}; 
