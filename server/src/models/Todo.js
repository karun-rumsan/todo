import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    datetime: { type: String, required: true },
    isDone: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
