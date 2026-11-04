# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

- Status code: `200`
- Response body: an array of book objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

- Status code: `200`
- Response body: the matching book object

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:

- Status code: `201`
- Response body: the newly created book object

Errors:

- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:

- Status code: `200`
- Response body: the updated book object

Errors:

- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

---

## Feature 2: Author CRUD Operations

### Goal

Create an authors API that supports all CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required, representing the author's birth year

Authors will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books reference authors through their `authorId` field.

The value of a book's `authorId` must match an existing author's custom `id`.

When deleting an author, the API must check whether any books reference that author.

If books still reference the author:

- Return `409 Conflict`.
- Do not delete the author.
- Return a safe message explaining that the author cannot be deleted while books reference them.

If no books reference the author, the API may delete the author.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

- Status code: `200`
- Response body: an array of author objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom id.

Success:

- Status code: `200`
- Response body: the matching author object

Errors:

- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Jane Austen",
      "birthYear": 1775
    }

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing or invalid
- `400` if the `id` already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

    {
      "name": "Jane Austen Updated",
      "birthYear": 1776
    }

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing or invalid
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no author exists with that id
- `409` if books still reference the author
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every author route.

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

---

# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Improvements from Version 1

- All required fields must be validated before database operations.
- Book `id`, `authorId`, and `title` must be non-empty strings.
- `publicationDate` must be a valid date in `YYYY-MM-DD` format.
- `authorId` must reference an existing author custom id.
- Duplicate book ids return `400 Bad Request`.
- PUT updates only `authorId`, `title`, and `publicationDate`; the original book `id` remains unchanged.
- Missing books return `404 Not Found`.
- Unexpected database errors return `500 Internal Server Error` with a safe message.
- Error responses must not expose database credentials or internal error details.

## Feature 2: Author CRUD Operations

### Improvements from Version 1

#### Author Validation

- `id` must be a non-empty string custom id, such as `a1`.
- `name` must be a non-empty string and cannot contain only whitespace.
- `birthYear` must be an integer.
- `birthYear` must be greater than or equal to `1`.
- `birthYear` must not exceed `2026`.
- Invalid or missing required fields return `400 Bad Request`.

#### Duplicate IDs

- Creating an author with an existing custom id returns `400 Bad Request`.
- The existing author must not be overwritten.

#### Update Behavior

- PUT updates only `name` and `birthYear`.
- The author's original custom `id` cannot be changed through PUT.
- Updating an author that does not exist returns `404 Not Found`.

#### Delete Behavior

- Before deleting an author, the API checks whether any books reference the author's custom id.
- If books reference the author, return `409 Conflict`.
- The author must not be deleted while referenced by books.
- If no books reference the author, delete it and return `204 No Content`.
- Deleting an author that does not exist returns `404 Not Found`.

#### Error Handling

- All validation errors return `400 Bad Request`.
- Missing resources return `404 Not Found`.
- Referenced authors cannot be deleted and return `409 Conflict`.
- Unexpected server or database errors return `500 Internal Server Error`.
- Error messages must be safe, understandable, and must not expose database credentials or internal implementation details.

### Swagger and Deployment

- Swagger must document all book and author CRUD routes.
- Request bodies, required fields, success responses, and error responses must be documented.
- Every route must be testable using local Swagger at `/api-docs`.
- Every route must also be tested using deployed Render Swagger at `/api-docs`.
