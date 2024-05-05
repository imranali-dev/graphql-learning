export const mutations = `#graphql
    createUser(firstName: String!, lastName: String, email: String!, password: String!): User
    fellowuser(to:ID!):Boolean
    unfellowuser(to:ID!):Boolean
`;