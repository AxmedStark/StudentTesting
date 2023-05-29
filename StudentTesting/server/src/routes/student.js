
import express from "express";
import { registerStudent, loginStudent, getStudentProfile, getAllStudents, updateStudentProfile, deleteStudentProfile } from "../controllers/studentController.js";
import { verifyToken } from "../middlewares.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile/:studentId", verifyToken, getStudentProfile);
router.get("/", verifyToken, getAllStudents);
router.put("/profile/:studentId", verifyToken, updateStudentProfile);
router.delete("/profile/:studentId", verifyToken, deleteStudentProfile);

export { router as studentRouter };
 