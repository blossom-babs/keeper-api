import mongoose, { Mongoose } from "mongoose";

const NoteSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: true,
  }
})

const Note = mongoose.model("Note", "NoteSchema")

export { Note }