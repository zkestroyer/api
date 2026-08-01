/**
 * GraphQL Schema Definition using Apollo Server template literal tag.
 */
export const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    email: String!
    course: String!
    year: Int!
    gpa: Float!
  }

  input CreateStudentInput {
    name: String!
    email: String!
    course: String!
    year: Int!
    gpa: Float!
  }

  input UpdateStudentInput {
    name: String
    email: String
    course: String
    year: Int
    gpa: Float
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
