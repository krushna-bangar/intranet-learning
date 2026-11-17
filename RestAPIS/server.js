const express = require("express");
const app = express();

// Middleware to parse incoming JSON entity bodies
app.use(express.json());

// Mock Database
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", available: false }
];

// ============================================================================
// REST DESIGN RULE 1: RESOURCE NAMING
// Use plural nouns (/api/v1/books) instead of verbs (/getBooks or /createBook).
// The HTTP Method already defines the action!
// ============================================================================

// ============================================================================
// 1. GET (Collection) - SAFE & IDEMPOTENT
// Safe: Does not alter server state.
// Idempotent: Calling it 10 times produces the exact same result as calling it once.
// ============================================================================
app.get("/api/v1/books", (req, res) => {
  // Filtering via query parameters (e.g., /api/v1/books?available=true)
  const { available } = req.query;

  if (available !== undefined) {
    const isAvailable = available === "true";
    const filtered = books.filter(b => b.available === isAvailable);
    return res.status(200).json(filtered); // 200 OK
  }

  res.status(200).json(books); // 200 OK
});

// ============================================================================
// 2. GET (Single Resource) - SAFE & IDEMPOTENT
// Uses a Path Parameter (:id) to identify a specific resource.
// ============================================================================
app.get("/api/v1/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    // 404 Not Found: The requested resource ID does not exist
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book); // 200 OK
});

// ============================================================================
// 3. POST (Create Resource) - NOT SAFE & NOT IDEMPOTENT
// Calling POST multiple times creates multiple duplicate resources.
// ============================================================================
app.post("/api/v1/books", (req, res) => {
  const { title, author, available } = req.body;

  // Input Validation
  if (!title || !author) {
    // 400 Bad Request: Client sent incomplete or invalid data
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    available: available ?? true
  };

  books.push(newBook);

  // 201 Created: Standard status code when a new resource is successfully created.
  // Best Practice: Include a 'Location' header pointing to the new resource URL.
  res
    .status(201)
    .location(`/api/v1/books/${newBook.id}`)
    .json(newBook);
});

// ============================================================================
// 4. PUT (Full Replacement) - NOT SAFE, BUT IDEMPOTENT
// Replaces the ENTIRE resource. Calling it repeatedly leaves the resource in
// the exact same state.
// ============================================================================
app.put("/api/v1/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, author, available } = req.body;
  if (!title || !author || available === undefined) {
    // PUT requires the complete representation of the object
    return res.status(400).json({ error: "PUT requires title, author, and available fields" });
  }

  // Overwrite the entire object
  books[index] = { id: bookId, title, author, available };

  res.status(200).json(books[index]); // 200 OK
});

// ============================================================================
// 5. PATCH (Partial Update) - NOT SAFE, USUALLY IDEMPOTENT
// Updates ONLY the specific fields provided in the request body.
// ============================================================================
app.patch("/api/v1/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Update only fields that were sent
  if (req.body.title !== undefined) book.title = req.body.title;
  if (req.body.author !== undefined) book.author = req.body.author;
  if (req.body.available !== undefined) book.available = req.body.available;

  res.status(200).json(book); // 200 OK
});

// ============================================================================
// 6. DELETE (Remove Resource) - NOT SAFE, BUT IDEMPOTENT
// Deleting an item once removes it; deleting it again still leaves it deleted.
// ============================================================================
app.delete("/api/v1/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(index, 1);

  // 204 No Content: Standard response for successful deletion when no body is returned
  res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`REST API Server running at http://localhost:${PORT}/api/v1/books`);
});
