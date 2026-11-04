import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CSE341 Books and Authors API",
      version: "2.0.0",
      description:
        "Books and Authors API for CSE341 Week 02. Supports CRUD operations for books and authors.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
      {
        url: "https://cse341-books-api-2va9.onrender.com",
        description: "Production server (Render)",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
