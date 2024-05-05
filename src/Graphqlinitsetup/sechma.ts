// Define a type for User
type User = {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    profileImageURL?: string;
  };
  
  // Sample dummy data for testing
  const users: User[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      profileImageURL: "https://example.com/profiles/john.jpg",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      profileImageURL: "https://example.com/profiles/jane.jpg",
    },
  ];
  
  // Define typeDefs for GraphQL schema
  const typeDefs = `
    type Query {
      users: [User]
    }
    type Mutation {
      # Add mutations here if needed
    }
    type User {
      id: String!
      firstName: String!
      lastName: String
      email: String!
      profileImageURL: String
    }
  `;
  
  // Define resolvers for Query and Mutation
  const resolvers = {
    Query: {
      users: () => users,
    },
    Mutation: {
      // Define mutations here if needed
    },
  };
  
  // Export typeDefs and resolvers
  export { typeDefs, resolvers };
  