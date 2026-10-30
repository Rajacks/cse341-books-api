import express from "express";
import {
  getAllBooksController,
  getBookByIdController,
} from "../controllers/books.js";

const router = express.Router();

// GET all books
router.get("/", getAllBooksController);

// GET one book by ID
router.get("/:id", getBookByIdController);

export default router;
