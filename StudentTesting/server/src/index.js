import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { studentRouter } from "./routes/student.js";
import { teacherRouter } from "./routes/teacher.js";
// import { examRouter } from "./routes/exam.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
// app.use("/exams", examRouter);

app.get("/", (req, res) => {
  res.send("Home page"); 
})  

mongoose.connect("mongodb+srv://admin:admin123@cluster0.9frhluj.mongodb.net/aztu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});  

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB"); 
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB:", err);
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
