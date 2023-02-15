import mongoose from "mongoose";

const LabelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  noteId: {
    type: String,
    required: true
  }
})

const Label = mongoose.model("Label", LabelSchema)

export { Label }