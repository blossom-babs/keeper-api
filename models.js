import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  }
})

const Note = mongoose.model("Note", NoteSchema)

export { Note }