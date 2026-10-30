# CSE341 Books API — Version 1 Evaluation

## 1. Bugs and Completeness

Version 1 identifies the two required GET endpoints, but some response requirements are incomplete.

Improvements needed:

- Define the exact JSON response for retrieving all books.
- Define the exact JSON response for retrieving one book.
- Specify the exact response body when a book is not found.
- Define the response when the books collection is empty.
- Specify the exact response for unexpected server errors.

## 2. Security

Version 1 does not provide enough detail about protecting sensitive information.

Improvements needed:

- Store MongoDB connection information in environment variables.
- Exclude the `.env` file from Git.
- Do not expose stack traces, database credentials, or internal error details in API responses.

## 3. Performance

Version 1 does not describe database retrieval expectations.

Improvements needed:

- Retrieve book records directly from the MongoDB `books` collection.
- Avoid unnecessary database queries.
- Retrieve only the requested book when using the single-book endpoint.

## 4. Clarity

Some API requirements need more precise descriptions.

Improvements needed:

- Specify ISO-8601 format for `publicationDate`.
- Document all expected HTTP status codes.
- Include exact JSON response examples.
- Clearly define the behavior of both endpoints.

## 5. Conclusion

Version 1 provides a basic foundation for the Books API, but it needs more detailed response definitions, security requirements, performance expectations, and error-handling rules.

These findings will guide the improvements in Version 2.
