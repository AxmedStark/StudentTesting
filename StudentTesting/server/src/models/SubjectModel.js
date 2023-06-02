import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
{ 
  name: {
    type: String,
    required: true,
    unique: true,
  } 
},
{
  collection: "subjects"
}  
);

const SubjectModel = mongoose.model("Subject", subjectSchema); 

export { SubjectModel };
