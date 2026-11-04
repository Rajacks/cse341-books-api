import express from "express";

import {
  getAllAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from "../controllers/authors.js";

const router = express.Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get("/", getAllAuthorsController);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 */
router.get("/:id", getAuthorByIdController);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a1
 *               name:
 *                 type: string
 *                 example: Jane Austen
 *               birthYear:
 *                 type: integer
 *                 example: 1775
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Author ID already exists
 */
router.post("/", createAuthorController);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Austen
 *               birthYear:
 *                 type: integer
 *                 example: 1775
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Author not found
 */
router.put("/:id", updateAuthorController);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author has existing books
 */
router.delete("/:id", deleteAuthorController);

export default router;
