import Book from "../models/book.js"

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getBooks: () => [Book],
    },
    Mutation: {
        addBook: async (_, { content }) => {
            const res = await new Book( {
              title: content.title,
              author: content.author
            }).save()
            return res
        },
        deleteBook: async (_, { id }) => {
            const res = await Book.findByIdAndDelete({
              _id: id
            })
      
            return res
          },
        updateBook: async (_, { content }) => {
            const res = await Book.findOneAndUpdate({
              _id: content.id
            }, {
              $set: {
                title: content.title,
                author: content.author
              }
            }, {
              new: true
            }
            )
            return res
          }
        }
}

export default resolvers
