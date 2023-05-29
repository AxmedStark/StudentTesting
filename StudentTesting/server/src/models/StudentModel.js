import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    } 
  },
  {
    collection: "students"
  }
);


const StudentModel = mongoose.model("Student", studentSchema);

export { StudentModel };
