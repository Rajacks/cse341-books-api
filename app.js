import express from "express";
import booksRoutes from "./src/routes/books.js";

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "CSE341 Books API is running!" });
});

// Books routes
app.use("/books", booksRoutes);

export default app;
