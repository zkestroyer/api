# Student Management System - WebSocket Notifications

A modern Student Management System with real-time WebSocket notifications.

## Architecture

- **Backend**: Node.js, Express, `ws` (WebSocket library).
- **Frontend**: Vanilla HTML/CSS/JS.
- **WebSocket Protocol**: HTTP upgrade handshake establishes a full-duplex persistent connection for real-time bidirectional communication.

## Setup

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Open `http://localhost:3006` in your browser.

## API & Events

### REST Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List all students |
| GET | `/api/students/:id` | Get student by ID |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

### WebSocket Events
- `student:created`
- `student:updated`
- `student:deleted`
- `student:list`

## How to Test
Open `http://localhost:3006` in multiple browser windows. Use the forms to create, update, or delete students, and observe real-time notifications in all connected clients.

## Folder Structure
```
src/
├── server.js              # Entry point
├── models/
│   └── Student.js         # Student class with validation
├── data/
│   └── StudentRepository.js  # In-memory CRUD data store
├── services/
│   ├── StudentService.js     # Business logic layer
│   └── WebSocketService.js   # Real-time communication
├── controllers/
│   └── StudentController.js  # Request handling
├── routes/
│   └── studentRoutes.js      # REST routes
└── public/
    └── index.html            # Web client
```

**Author**: Zainab Khan
