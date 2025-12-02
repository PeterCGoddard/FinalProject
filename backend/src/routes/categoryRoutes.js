import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", authMiddleware, createCategory);
router.get("/", getCategories);

export default router;