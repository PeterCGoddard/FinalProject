import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TechTalk Hub API running..." });
});

export default app;
