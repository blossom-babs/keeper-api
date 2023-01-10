import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: true,
  }
})

const Note = mongoose.model("Note", NoteSchema)

export { Note }