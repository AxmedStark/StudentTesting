import express from "express";
import { verifyToken } from "../middlewares.js";
import { createQuestion, getQuestion, updateQuestion, deleteQuestion } from "../controllers/examController.js";

const router = express.Router();

// Create a new question
router.post("/questions", verifyToken, createQuestion);

// Get a specific question
router.get("/questions/:questionId", verifyToken, getQuestion);

// Update a question
router.put("/questions/:questionId", verifyToken, updateQuestion);

// Delete a question
router.delete("/questions/:questionId", verifyToken, deleteQuestion);

export { router as examRouter };
 