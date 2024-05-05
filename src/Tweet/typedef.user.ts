export const typeDefs = `#graphql
    type TweetsSechma {
        content: String!
        imageURL: String
    }
    type Tweet {
        id: ID!
        content: String!
        imageURL: String
        author: User
    }
`;