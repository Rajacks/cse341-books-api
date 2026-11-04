# CSE341 Books Web Service API Specification - Version 2.0

Project: CSE341 Books API  
Specification Version: 2.0  
Database: MongoDB Atlas  
\*\*Database Name: `cse341-books-db`  
Collection: `books`

## 1. Project Overview

The Books API is a read-only RESTful web service that allows clients to retrieve book information stored in MongoDB.

The API provides two endpoints:

- Retrieve all books.
- Retrieve one book using its unique ID.

The API returns responses in JSON format.

## 2. Database Specification

Database: `cse341-books-db`

Collection: `books`

Each book document must contain these fields:

| Field             | Data Type | Description                                      |
| ----------------- | --------- | ------------------------------------------------ |
| `id`              | String    | Unique identifier for the book                   |
| `author`          | String    | Name of the book's author                        |
| `title`           | String    | Title of the book                                |
| `publicationDate` | String    | Publication date in ISO-8601 format (YYYY-MM-DD) |

### Sample Book Document

```json
{
  "id": "b1",
  "author": "Jane Austen",
  "title": "Pride and Prejudice",
  "publicationDate": "1813-01-28"
}
```

## 3. API Endpoints

### 3.1 Retrieve All Books

**HTTP Method:** GET

**Endpoint:** `/books`

**Description:** Retrieves all book records from the MongoDB `books` collection.

**Successful Response:**

- Status Code: `200 OK`
- Content-Type: `application/json`
- Response Body: An array of book objects.

Example:

```json
[
  {
    "id": "b1",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "publicationDate": "1813-01-28"
  },
  {
    "id": "b2",
    "author": "George Orwell",
    "title": "1984",
    "publicationDate": "1949-06-08"
  },
  {
    "id": "b3",
    "author": "F. Scott Fitzgerald",
    "title": "The Great Gatsby",
    "publicationDate": "1925-04-10"
  }
]
```

If the collection contains no books, the endpoint must return an empty JSON array with HTTP `200 OK`.

**Server Error Response:**

- Status Code: `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

### 3.2 Retrieve a Single Book

**HTTP Method:** GET

**Endpoint:** `/books/:id`

**Description:** Retrieves one book using its unique `id` value.

**Example Request:**

`GET /books/b1`

**Successful Response:**

- Status Code: `200 OK`
- Content-Type: `application/json`
- Response Body: A single book object.

```json
{
  "id": "b1",
  "author": "Jane Austen",
  "title": "Pride and Prejudice",
  "publicationDate": "1813-01-28"
}
```

**Book Not Found Response:**

- Status Code: `404 Not Found`

```json
{
  "message": "Book not found"
}
```

**Server Error Response:**

- Status Code: `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

## 4. HTTP Status Codes

| Status Code                 | Meaning                 | Usage                              |
| --------------------------- | ----------------------- | ---------------------------------- |
| `200 OK`                    | Request successful      | Books retrieved successfully       |
| `404 Not Found`             | Resource not found      | Requested book ID does not exist   |
| `500 Internal Server Error` | Unexpected server error | Database or server operation fails |

## 5. Security Requirements

- MongoDB connection information must be stored in environment variables.
- The `.env` file must be excluded from Git using `.gitignore`.
- Database credentials must never be included in source code or public responses.
- API error responses must not expose stack traces, database credentials, or internal implementation details.
- Unexpected errors must return a safe generic error message.

## 6. Performance and Database Requirements

- Book records must be retrieved directly from the MongoDB `books` collection.
- The all-books endpoint must retrieve the collection's records.
- The single-book endpoint must retrieve only the requested book using its `id`.
- The application must establish its database connection before accepting API requests.

## 7. Project Scope and Limitations

This version supports read-only operations only.

Included:

- `GET /books`
- `GET /books/:id`

Excluded:

- `POST` — Creating books.
- `PUT` — Replacing book records.
- `PATCH` — Updating book records.
- `DELETE` — Removing books.
- User authentication and authorization.

## 8. Seed Data Requirements

The database should contain sample book records for testing.

The initial test records are:

1. Jane Austen — Pride and Prejudice — 1813-01-28
2. George Orwell — 1984 — 1949-06-08
3. F. Scott Fitzgerald — The Great Gatsby — 1925-04-10

## 9. Implementation and Testing Requirements

The implementation must:

1. Connect to MongoDB Atlas using environment variables.
2. Retrieve all books through `GET /books`.
3. Retrieve one book through `GET /books/:id`.
4. Return the correct HTTP status codes.
5. Return the specified JSON response structures.
6. Handle missing records and unexpected errors safely.
7. Keep sensitive database information private.

## 10. Improvements from Version 1

Version 2 improves the original specification by:

- Adding complete JSON response examples.
- Defining exact error response messages.
- Specifying the behavior of an empty books collection.
- Clarifying the ISO-8601 publication date format.
- Adding database security requirements.
- Defining database retrieval expectations.
- Documenting seed data and implementation requirements.

**End of API Specification — Version 2.0**
