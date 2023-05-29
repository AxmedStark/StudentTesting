import { StudentModel } from "../models/StudentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
 
// Register a new student // working
export const registerStudent = async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await StudentModel.findOne({ username });
    if (student) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new StudentModel({ username, password: hashedPassword });
    await newStudent.save();
    res.json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error during student registration:", error); 
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login student // working
export const loginStudent = async (req, res) => {
  const { username, password } = req.body;
  try {
    const student = await StudentModel.findOne({ username });
    if (!student) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res
        .status(400) 
        .json({ message: "Username or password is incorrect" });
    }
    const token = generateToken(student._id);
    res.json({ token, studentID: student._id });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get student profile // working
export const getStudentProfile = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the student profile
    res.json({ student });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// Get all student profiles // working
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json({ students });
  } catch (error) {
    console.error("Error fetching student profiles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
  const studentId = req.params.studentId;
  const updatedProfile = req.body;

  try {
    const student = await StudentModel.findByIdAndUpdate(
      studentId,
      updatedProfile,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return the updated student profile
    res.json({ student });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};  
 
// Delete student profile // working 
export const deleteStudentProfile = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting student profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to generate JWT token
const generateToken = (studentId) => {
  console.log(jwt.sign({ id: studentId }, "secret"));
  return jwt.sign({ id: studentId }, "secret");
};
 