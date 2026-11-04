import { getDb } from "../db/connect.js";

// GET all authors
export const getAllAuthors = async () => {
  const db = getDb();

  return await db
    .collection("authors")
    .find({}, { projection: { _id: 0 } })
    .toArray();
};

// GET one author by custom ID
export const getAuthorById = async (id) => {
  const db = getDb();

  return await db
    .collection("authors")
    .findOne({ id }, { projection: { _id: 0 } });
};

// CREATE an author
export const createAuthor = async (author) => {
  const db = getDb();

  await db.collection("authors").insertOne(author);

  return author;
};

// UPDATE an author
export const updateAuthor = async (id, author) => {
  const db = getDb();

  const result = await db
    .collection("authors")
    .updateOne({ id }, { $set: author });

  if (result.matchedCount === 0) {
    return null;
  }

  return await getAuthorById(id);
};

// DELETE an author
export const deleteAuthor = async (id) => {
  const db = getDb();

  // Check whether the author has books
  const books = await db.collection("books").findOne({ authorId: id });

  if (books) {
    return { conflict: true };
  }

  return await db.collection("authors").deleteOne({ id });
};
