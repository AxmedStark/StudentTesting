import express from "express";
import { createQuestion, getQuestion, getAllQuestions, updateQuestion, deleteQuestion } from "../controllers/questionController.js";
import { verifyToken } from "../middlewares.js"; 

const router = express.Router(); 

router.post("/create", createQuestion); 
router.get("/:questionId", verifyToken, getQuestion);
router.get("/", verifyToken, getAllQuestions); 
router.put("/:questionId", verifyToken, updateQuestion);
router.delete("/:questionId", verifyToken, deleteQuestion);
router.delete("/:questionId", verifyToken, deleteQuestion);
// router.get("/random", getRandomQuestionsWithAnswers);

export { router as questionRouter };  