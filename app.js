import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/swagger.js";
import booksRoutes from "./src/routes/books.js";
import authorsRoutes from "./src/routes/authors.js";

const app = express();

app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "CSE341 Books API is running!" });
});

// Books routes
app.use("/books", booksRoutes);

// Authors routes
app.use("/authors", authorsRoutes);

export default app;
