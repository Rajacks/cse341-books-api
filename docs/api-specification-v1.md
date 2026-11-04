# CSE341 Books API Specification — Version 1

## 1. Overview

The Books API is a read-only RESTful web service that allows clients to retrieve book information.

## 2. Database

- Database: `cse341-books-db`
- Collection: `books`

## 3. Book Data Structure

Each book contains:

| Field           | Type   |
| --------------- | ------ |
| id              | String |
| author          | String |
| title           | String |
| publicationDate | String |

## 4. API Endpoints

### GET /books

Retrieves all books from the database.

Successful response: HTTP 200 with a JSON array of books.

### GET /books/:id

Retrieves a specific book using its ID.

Successful response: HTTP 200 with a JSON object containing the requested book.

If the book does not exist, return HTTP 404.

## 5. Error Handling

Unexpected server errors should return HTTP 500.

## 6. Project Scope

The API is read-only.

The following operations are not included:

- Creating books
- Updating books
- Deleting books
- User authentication

**End of Version 1**
