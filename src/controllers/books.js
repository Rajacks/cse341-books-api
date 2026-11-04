import {
  getAllBooks,
  getBookById,
  authorExists,
  createBook,
  updateBook,
  deleteBook,
} from "../models/books.js";

// GET all books
export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error retrieving books:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// GET one book by ID
export const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// POST create a book
export const createBookController = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    if (
      typeof id !== "string" ||
      !id.trim() ||
      typeof authorId !== "string" ||
      !authorId.trim() ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof publicationDate !== "string" ||
      !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required and must be valid strings",
      });
    }

    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(publicationDate) &&
      !Number.isNaN(Date.parse(publicationDate)) &&
      new Date(publicationDate).toISOString().startsWith(publicationDate);

    if (!validDate) {
      return res.status(400).json({
        message: "publicationDate must be a valid YYYY-MM-DD date",
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: "Book ID already exists",
      });
    }

    if (!(await authorExists(authorId))) {
      return res.status(400).json({
        message: "Author does not exist",
      });
    }

    const book = { id, authorId, title, publicationDate };

    await createBook(book);

    return res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// PUT update a book
export const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, publicationDate } = req.body;

    if (
      typeof authorId !== "string" ||
      !authorId.trim() ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof publicationDate !== "string" ||
      !publicationDate.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required and must be valid strings",
      });
    }

    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(publicationDate) &&
      !Number.isNaN(Date.parse(publicationDate)) &&
      new Date(publicationDate).toISOString().startsWith(publicationDate);

    if (!validDate) {
      return res.status(400).json({
        message: "publicationDate must be a valid YYYY-MM-DD date",
      });
    }

    if (!(await authorExists(authorId))) {
      return res.status(400).json({
        message: "Author does not exist",
      });
    }

    const updatedBook = await updateBook(id, {
      authorId,
      title,
      publicationDate,
    });

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// DELETE a book
export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBook(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
