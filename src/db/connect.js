import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

if (!dbName) {
  throw new Error("MONGODB_DB_NAME environment variable is not defined");
}

const client = new MongoClient(uri);

let database;

export const connectToDb = async () => {
  try {
    await client.connect();
    database = client.db(dbName);
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export const getDb = () => {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
};
