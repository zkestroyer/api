# 🌐 API Architectures — Research & Implementation

> **Internship R&D Assignment** — A comprehensive study, implementation, and comparative analysis of six modern API communication architectures.

**Author:** Zainab Khan  
**Role:** Full Stack Development Intern

---

## 📋 Overview

This repository contains working implementations of **six different API architectures**, all built around the same application — a **Student Management System** — to enable fair comparison. Each implementation follows OOP patterns with ES6 classes, proper JSDoc documentation, and clean separation of concerns.

## 🏗️ API Architectures Implemented

| # | API Type | Branch | Port | Technology |
|---|----------|--------|------|------------|
| 1 | **RESTful API** | `rest-api` | 3001 | Express.js |
| 2 | **SOAP API** | `soap-api` | 3002 | node-soap |
| 3 | **GraphQL API** | `graphql-api` | 3003 | Apollo Server |
| 4 | **Webhooks** | `webhooks` | 3004/3005 | Express + Axios |
| 5 | **WebSockets** | `websockets` | 3006 | ws library |
| 6 | **gRPC** | `grpc` | 50051 | @grpc/grpc-js |

## 📂 Repository Structure

Each API implementation lives in its own **branch** for clean separation:

```
main branch (this branch)
├── documentation/
│   ├── report.html          # Full technical report (print to PDF)
│   ├── diagrams/            # Architecture diagrams
│   └── screenshots/         # Testing screenshots
├── rest-api/                # REST implementation
├── soap-api/                # SOAP implementation
├── graphql-api/             # GraphQL implementation
├── webhooks/                # Webhook implementation
├── websockets/              # WebSocket implementation
├── grpc/                    # gRPC implementation
└── README.md                # This file
```

### Branch Navigation

```bash
# Switch to view a specific implementation
git checkout rest-api        # RESTful API
git checkout soap-api        # SOAP API
git checkout graphql-api     # GraphQL API
git checkout webhooks        # Webhooks
git checkout websockets      # WebSockets
git checkout grpc            # gRPC
git checkout main            # Documentation & overview
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** 9+ installed

### Running Any Implementation

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Navigate to the desired API folder
cd rest-api          # (or soap-api, graphql-api, webhooks, websockets, grpc)

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### Implementation-Specific Instructions

Each API architecture now includes a full visual **Web Dashboard**! You don't need Postman or cURL anymore — you can test them directly in your browser.

| API | Start Command | UI Dashboard Link |
|-----|--------------|-----------|
| **REST** | `cd rest-api && npm start` | [http://localhost:3001](http://localhost:3001) |
| **SOAP** | `cd soap-api && npm start` | [http://localhost:3008](http://localhost:3008) |
| **GraphQL** | `cd graphql-api && npm start` | [http://localhost:3003](http://localhost:3003) |
| **Webhooks** | `cd webhooks && npm start` | Sender: [http://localhost:3004](http://localhost:3004)<br>Receiver: [http://localhost:3005](http://localhost:3005) |
| **WebSockets** | `cd websockets && npm start` | [http://localhost:3006](http://localhost:3006) |
| **gRPC** | `cd grpc && npm start` | [http://localhost:3007](http://localhost:3007) |

## 📊 Student Data Model

All implementations use the same data model for consistency:

```json
{
    "id": "UUID v4",
    "name": "string",
    "email": "string",
    "course": "string",
    "year": "integer (1-4)",
    "gpa": "float (0.0-4.0)"
}
```

Pre-seeded with 3 sample students for immediate testing.

## 📄 Documentation

The complete technical report is available at `documentation/report.html`. Open it in a browser and use **Ctrl+P → Save as PDF** for a professional PDF version.

The report includes:
- Theoretical overview of each API architecture
- Communication protocol details
- Request/response flow with code examples
- Architecture diagrams
- Implementation details
- Comprehensive comparison table
- Decision matrix for choosing the right API

## 🏛️ Code Architecture

All implementations follow the same OOP layered pattern:

```
Model → Repository → Service → Controller/Handler
```

- **Model:** Data entity with validation
- **Repository:** In-memory CRUD data store (singleton)
- **Service:** Business logic layer
- **Controller:** Request/response handling

## 📝 License

This project is part of an internship assignment for educational purposes.

---

**Zainab Khan** — Full Stack Development Intern
