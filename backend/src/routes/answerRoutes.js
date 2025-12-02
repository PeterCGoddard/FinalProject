import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAnswer, getAnswers } from "../controllers/answerController.js";

const router = express.Router();

router.post("/", authMiddleware, createAnswer);
router.get("/:questionId", getAnswers);

export default router;
