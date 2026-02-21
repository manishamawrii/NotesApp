import mongoose from "mongoose";


const noteSchema= new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId , ref:"Userdet",required:true},

  title:{type:String,required:true},
  content:{type:String,required:true},
    color: {
      type: String,
      default: "pink",   // 👈 ADD THIS LINE
    },
},{timestamps:true});

const Note = mongoose.model('Note',noteSchema);
export default Note;


// user field me database sirf ObjectId store karta hai.

// Lekin ref: "Userdet" aur populate() ki wajah se aap poora user document (id, name, email, etc.) access kar sakte ho.

// 👉 Model file = blueprint of your data + rules + helper functions + MongoDB connection point.