import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createQuestion, getQuestionsByCategory } from "../controllers/questionController.js";

const router = express.Router();

router.post("/", authMiddleware, createQuestion);
router.get("/:categoryId", getQuestionsByCategory);

export default router;
