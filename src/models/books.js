import { getDb } from "../db/connect.js";

// GET all books
export const getAllBooks = async () => {
  const db = getDb();

  return await db
    .collection("books")
    .find({}, { projection: { _id: 0 } })
    .toArray();
};

// GET one book by custom ID
export const getBookById = async (id) => {
  const db = getDb();

  return await db
    .collection("books")
    .findOne({ id }, { projection: { _id: 0 } });
};

// Check if an author exists
export const authorExists = async (authorId) => {
  const db = getDb();

  const author = await db.collection("authors").findOne({ id: authorId });

  return Boolean(author);
};

// CREATE a book
export const createBook = async (book) => {
  const db = getDb();

  await db.collection("books").insertOne(book);

  return book;
};

// UPDATE a book
export const updateBook = async (id, book) => {
  const db = getDb();

  const result = await db.collection("books").updateOne({ id }, { $set: book });

  if (result.matchedCount === 0) {
    return null;
  }

  return await getBookById(id);
};

// DELETE a book
export const deleteBook = async (id) => {
  const db = getDb();

  return await db.collection("books").deleteOne({ id });
};
