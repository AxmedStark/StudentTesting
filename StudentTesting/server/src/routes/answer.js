import express from "express";
import { createAnswer, getAnswer, getAllAnswers, updateAnswer, deleteAnswer, calculateTotalScore, getCorrectAnswerFromArray} from "../controllers/answerController.js";
import { verifyToken } from "../middlewares.js";

const router = express.Router();

router.post("/create", createAnswer); 
router.get("/:answerId", verifyToken, getAnswer);
router.get("/", verifyToken, getAllAnswers);
router.put("/:answerId", verifyToken, updateAnswer);
router.delete("/:answerId", verifyToken, deleteAnswer); 
router.get("/total-score", verifyToken, calculateTotalScore);
router.post("/correct", verifyToken, getCorrectAnswerFromArray);
export { router as answerRouter };    