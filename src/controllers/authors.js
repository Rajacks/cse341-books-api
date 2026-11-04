import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../models/authors.js";

// GET all authors
export const getAllAuthorsController = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve authors." });
  }
};

// GET one author by ID
export const getAuthorByIdController = async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found." });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve author." });
  }
};

// CREATE an author
export const createAuthorController = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body;

    if (
      typeof id !== "string" ||
      !id.trim() ||
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear < 1 ||
      birthYear > new Date().getFullYear()
    ) {
      return res.status(400).json({
        message: "Valid id, name, and birthYear are required.",
      });
    }

    const existingAuthor = await getAuthorById(id);

    if (existingAuthor) {
      return res.status(409).json({ message: "Author ID already exists." });
    }

    const author = { id, name: name.trim(), birthYear };

    await createAuthor(author);

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to create author." });
  }
};

// UPDATE an author
export const updateAuthorController = async (req, res) => {
  try {
    const { name, birthYear } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(birthYear) ||
      birthYear < 1 ||
      birthYear > new Date().getFullYear()
    ) {
      return res.status(400).json({
        message: "Valid name and birthYear are required.",
      });
    }

    const author = await updateAuthor(req.params.id, {
      name: name.trim(),
      birthYear,
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found." });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to update author." });
  }
};

// DELETE an author
export const deleteAuthorController = async (req, res) => {
  try {
    const result = await deleteAuthor(req.params.id);

    if (result.conflict) {
      return res.status(409).json({
        message: "Cannot delete an author who has books.",
      });
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Author not found." });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author." });
  }
};
