import express from "express";
import { getAllBooksController } from "../controllers/books.js";

const router = express.Router();

router.get("/", getAllBooksController);

export default router;
