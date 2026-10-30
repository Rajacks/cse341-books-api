import express from "express";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "CSE341 Books API is running!",
  });
});

export default app;
