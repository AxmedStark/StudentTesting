import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  collection: "teachers"
} 
);

const TeacherModel = mongoose.model("Teacher", teacherSchema);

export { TeacherModel };
