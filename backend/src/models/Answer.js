import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body:
    {
      type: String,
      required: true,
      minlength: 2,
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Answer", answerSchema);
