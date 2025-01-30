import Book from "../models/book.js"

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getBooks: () => [Book],
    }
}

export default resolvers
