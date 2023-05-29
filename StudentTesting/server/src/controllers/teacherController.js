import { TeacherModel } from "../models/TeacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

// Register a new teacher // working
export const registerTeacher = async (req, res) => {
  const { username, password } = req.body;
  try {
    const teacher = await TeacherModel.findOne({ username });
    if (teacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new TeacherModel({ username, password: hashedPassword });
    await newTeacher.save();
    res.json({ message: "Teacher registered successfully" });
  } catch (error) { 
    console.error("Error during teacher registration:", error);
    res.status(500).json({ message: "Internal server error" });
  } 
};
 
// Login teacher // working
export const loginTeacher = async (req, res) => {
  const { username, password } = req.body;
  try {
    const teacher = await TeacherModel.findOne({ username });
    if (!teacher) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = generateToken(teacher._id);
    res.json({ token, teacherID: teacher._id });
  } catch (error) {
    console.error("Error during teacher login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get teacher profile // working
export const getTeacherProfile = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const teacher = await TeacherModel.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Return the teacher profile
    res.json({ teacher });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all teacher profiles // working
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.json({ teachers });
  } catch (error) {
    console.error("Error fetching teacher profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update teacher profile
export const updateTeacherProfile = async (req, res) => {
  const teacherId = req.params.teacherId;
  const updatedProfile = req.body;

  try {
    const teacher = await TeacherModel.findByIdAndUpdate(
      teacherId,
      updatedProfile,
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Return the updated teacher profile
    res.json({ teacher });
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Delete teacher profile // working
export const deleteTeacherProfile = async (req, res) => {
  const teacherId = req.params.teacherId;

  try {
    const deletedTeacher = await TeacherModel.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting Teacher profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Helper function to generate JWT token
const generateToken = (teacherId) => {
  return jwt.sign({ id: teacherId }, "secret"); 
};
