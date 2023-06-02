import express from "express";
import { createSubject, getSubject, getAllSubjects, updateSubject, deleteSubject } from "../controllers/subjectController.js";
import { verifyToken } from "../middlewares.js"; 

const router = express.Router();

router.post("/create", createSubject); 
router.get("/:subjectId", verifyToken, getSubject);
router.get("/", verifyToken, getAllSubjects); 
router.put("/:subjectId", verifyToken, updateSubject);
router.delete("/:subjectId", verifyToken, deleteSubject);

export { router as subjectRouter }; 