# Student Management System - gRPC API

A Node.js backend demonstrating a complete gRPC API architecture for a Student Management System.

## Architecture Overview

This project implements a gRPC API using `@grpc/grpc-js` and `@grpc/proto-loader`. gRPC provides high performance, binary serialization (Protocol Buffers), and uses HTTP/2 under the hood, making it ideal for microservices and efficient communication. Dynamic proto loading is used to avoid needing the `protoc` compiler on the target machine.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the gRPC server:
   ```bash
   npm run start:server
   ```

3. In a separate terminal, run the test client:
   ```bash
   npm run start:client
   ```

## Proto File Documentation

The service is defined in `src/proto/student.proto`. It outlines the `Student` message structure and the `StudentService` which provides 5 core RPC methods:
- `GetStudents`: Returns a list of all students.
- `GetStudent`: Returns a single student by ID.
- `CreateStudent`: Creates a new student.
- `UpdateStudent`: Updates an existing student.
- `DeleteStudent`: Deletes a student by ID.

## Expected Client Output

Running the client will output:
1. List of all 3 pre-seeded students
2. Details of the first student retrieved by ID
3. Creation response of a newly added student
4. The updated details of the previously added student
5. A successful deletion response
6. The final list of students, confirming the deletion

## Folder Structure

```
src/
├── proto/
│   └── student.proto        # Protocol Buffer definitions
├── models/
│   └── Student.js           # Student entity model with validation
├── data/
│   └── StudentRepository.js # In-memory singleton data store
├── services/
│   └── StudentGrpcService.js # Handlers for gRPC requests
├── server.js                # gRPC Server initialization
└── client.js                # Test client
```

**Author**: Zainab Khan
