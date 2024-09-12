import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Add index for performance on frequently queried fields
notesSchema.index({ title: "text", content: "text", userId: 1, tags: 1 });

const Note = mongoose.model("Note", notesSchema);

export default Note;
