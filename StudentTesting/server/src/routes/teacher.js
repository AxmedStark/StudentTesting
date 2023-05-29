import express from "express";
import { registerTeacher, loginTeacher, getTeacherProfile, getAllTeachers, updateTeacherProfile, deleteTeacherProfile } from "../controllers/teacherController.js";
import { verifyToken } from "../middlewares.js";
 
const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.get("/profile/:teacherId", verifyToken, getTeacherProfile);
router.get("/", verifyToken, getAllTeachers);
router.put("/profile/:teacherId", verifyToken, updateTeacherProfile);
router.delete("/profile/:teacherId", verifyToken, deleteTeacherProfile);

export { router as teacherRouter };
 