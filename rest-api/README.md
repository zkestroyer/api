# Student Management System API

A complete RESTful API for a Student Management System built with Express.js and ES6 modules.

## Architecture Overview

This project follows a clean architecture pattern with clear separation of concerns:
- **Models**: Defines the data structure and validation (e.g., `Student.js`)
- **Repository**: Handles data access and in-memory storage singleton (e.g., `StudentRepository.js`)
- **Services**: Contains the core business logic and orchestration (e.g., `StudentService.js`)
- **Controllers**: Handles incoming HTTP requests and generates responses (e.g., `StudentController.js`)
- **Routes**: Maps HTTP endpoints to controller methods (e.g., `studentRoutes.js`)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or npm start
   ```

The server will start on port 3001.

## API Endpoints

| Method | Route | Description | Request Body | Response |
|--------|-------|-------------|--------------|----------|
| GET | `/api/students` | Get all students | None | `200 OK` Array of students |
| GET | `/api/students/:id` | Get student by ID | None | `200 OK` Student object <br> `404 Not Found` |
| POST | `/api/students` | Create new student | `{ name, email, course, year, gpa }` | `201 Created` Student object <br> `400 Bad Request` |
| PUT | `/api/students/:id` | Update student | Partial or full student object | `200 OK` Updated student <br> `400 Bad Request` <br> `404 Not Found` |
| DELETE | `/api/students/:id` | Delete student | None | `204 No Content` <br> `404 Not Found` |

## Example cURL Commands

**Get all students:**
```bash
curl -X GET http://localhost:3001/api/students
```

**Get a student by ID:**
```bash
curl -X GET http://localhost:3001/api/students/<student-id>
```

**Create a new student:**
```bash
curl -X POST http://localhost:3001/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","course":"Mathematics","year":2,"gpa":3.8}'
```

**Update a student:**
```bash
curl -X PUT http://localhost:3001/api/students/<student-id> \
  -H "Content-Type: application/json" \
  -d '{"gpa":3.9}'
```

**Delete a student:**
```bash
curl -X DELETE http://localhost:3001/api/students/<student-id>
```

## Folder Structure

```
rest-api/
├── server.js              # Entry point and middleware setup
├── package.json           # Dependencies and scripts
├── README.md              # Documentation
├── models/
│   └── Student.js         # Student model class with validation
├── data/
│   └── StudentRepository.js # In-memory data store using Map
├── services/
│   └── StudentService.js  # Business logic layer
├── controllers/
│   └── StudentController.js # Express route handlers
└── routes/
    └── studentRoutes.js   # API route definitions
```

## Author
Zainab Khan
