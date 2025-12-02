import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    category:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:
    {
      type: String,
      required: true,
      minlength: 5,
    },
    body:
    {
      type: String,
      required: true,
      minlength: 10,
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Question", questionSchema);
