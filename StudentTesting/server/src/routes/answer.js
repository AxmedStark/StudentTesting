import express from "express";
import { createAnswer, getAnswer, getAllAnswers, updateAnswer, deleteAnswer } from "../controllers/answerController.js";
import { verifyToken } from "../middlewares.js"; 

const router = express.Router();

router.post("/create", createAnswer); 
router.get("/:answerId", verifyToken, getAnswer);
router.get("/", verifyToken, getAllAnswers); 
router.put("/:answerId", verifyToken, updateAnswer);
router.delete("/:answerId", verifyToken, deleteAnswer);

export { router as answerRouter };  