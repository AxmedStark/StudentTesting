import { SubjectModel } from "../models/SubjectModel.js";
import jwt from "jsonwebtoken";

// Create a new subject
export const createSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const subject = await SubjectModel.findOne({ name });

    if (subject) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const newSubject = new SubjectModel({ name });
    await newSubject.save();

    res.json({ message: "Subject created successfully", subject: newSubject });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a subject by subjectId
export const getSubject = async (req, res) => {
  const subjectId = req.params.subjectId;

  try {
    const subject = await SubjectModel.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ subject });
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.find();
    res.json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a subject
export const updateSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const updatedSubject = req.body;

  try {
    const subject = await SubjectModel.findByIdAndUpdate(
      subjectId,
      updatedSubject,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject updated successfully", subject });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a subject
export const deleteSubject = async (req, res) => {
  const subjectId = req.params.subjectId;

  try {
    const deletedSubject = await SubjectModel.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to generate JWT token
const generateToken = (subjectId) => {
  const token = jwt.sign({ id: subjectId }, "secret");
  return token;
};