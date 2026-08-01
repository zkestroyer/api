# Student Management System GraphQL API

A complete, robust GraphQL API built with Apollo Server 4 to manage student records.

## Overview
This project provides a GraphQL architecture following Domain-Driven Design principles. It uses an in-memory repository pattern for data storage (seeded with sample students) and exposes a comprehensive set of Queries and Mutations.

### Author
**Zainab Khan**

## Features
- Complete GraphQL CRUD operations for Student entities
- Domain models with input validation
- Service and Repository layers for clean separation of concerns
- Built with Apollo Server 4 and ES6 Modules

## Folder Structure
```
src/
├── server.js              # Entry point starting Apollo Server on port 3003
├── models/
│   └── Student.js         # Student class with validation and JSDoc
├── data/
│   └── StudentRepository.js  # In-memory CRUD data store (singleton)
├── services/
│   └── StudentService.js     # Business logic layer
├── schema/
│   └── typeDefs.js        # GraphQL schema (SDL)
└── resolvers/
    └── studentResolvers.js# GraphQL resolvers mapping to services
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # Or for development: npm run dev
   ```

3. **Access the API:**
   The server runs on `http://localhost:3003/`. 
   Open this URL in your browser to access the **Apollo Sandbox** interface where you can explore the schema and run test queries.

## Schema Documentation

### Types
- **Student**: `id` (ID!), `name` (String!), `email` (String!), `course` (String!), `year` (Int!), `gpa` (Float!)

### Queries
- `students: [Student!]!`
- `student(id: ID!): Student`

### Mutations
- `createStudent(input: CreateStudentInput!): Student!`
- `updateStudent(id: ID!, input: UpdateStudentInput!): Student!`
- `deleteStudent(id: ID!): Boolean!`

## Example Operations (Apollo Sandbox)

### 1. Get All Students
```graphql
query GetStudents {
  students {
    id
    name
    email
    course
    year
    gpa
  }
}
```

### 2. Create a New Student
```graphql
mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    id
    name
    course
  }
}
```
*Variables:*
```json
{
  "input": {
    "name": "Jane Doe",
    "email": "jane@university.edu",
    "course": "Data Science",
    "year": 1,
    "gpa": 4.0
  }
}
```
