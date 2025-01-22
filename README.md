# Task Management App

---

## Introduction

Welcome to the **Task Management App**! This application is designed to demonstrate a robust, scalable, and user-friendly task management system. This README provides an in-depth understanding of the project's architecture, design decisions, features, scalability considerations, and future improvements.

This project adheres to clean, structured, and production-ready code, with a focus on collaboration, scalability, and maintainability.

---

## Features and Requirements

### Core Functionality

1. **Create a New Task (Required)**:
   - Fields: 
     - Name
     - Description
     - Due date
   - Backend validation ensures all required fields are provided.

2. **View All Tasks (Required)**:
   - List view with:
     - Name
     - Description
     - Due date
     - Created date
     - Status:
       - **Not Urgent**: Due date is more than 7 days away.
       - **Due Soon**: Due date is within 7 days.
       - **Overdue**: Due date has passed.

3. **Edit a Task (Required)**:
   - Modify task name, description, and due date.

4. **Sorting (Should Have)**:
   - Tasks can be sorted by due date or created date in ascending or descending order.
   - Default sorting: Tasks sorted by `createdAt` in descending order (most recent first).

5. **Search (Should Have)**:
   - Search tasks by name using a case-insensitive match.

---

## Architecture

### Layered Structure: Controller, Service, Model

The app is structured into **Controller**, **Service**, and **Model** layers to ensure separation of concerns:

1. **Controller**:
   - Handles HTTP requests and responses.
   - Validates input using middleware (e.g., Zod schemas).
   - Delegates business logic to the service layer.
   - Example: `getAllTasks` processes query parameters and forwards them to the service.

2. **Service**:
   - Contains business logic and orchestrates operations between the controller and model.
   - Centralizes business rules for easy updates and maintenance.
   - Error handling is done in this layer, allowing the middleware to catch and process thrown errors.
   - Example: `getAllTasks` applies sorting, filtering, and pagination logic.

3. **Model**:
   - Interacts with the database using Prisma ORM.
   - Encapsulates direct database queries for cleaner abstraction.
   - Example: `getAllTasksWithCount` fetches paginated tasks and their total count.

**Why this structure?**
- Promotes modularity and reusability.
- Facilitates testing by isolating business logic from database operations.
- Simplifies debugging by narrowing down issues to specific layers.

---

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js (Express), TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker
- **Date Handling**: Luxon
- **Validation**: Zod
- **State Management**: React hooks

---

## Setup and Run

### Prerequisites

- **Node.js**: >= 18.19.1
- **Docker**: Installed and configured
- **Yarn**: Installed globally

---

### Running the Application

#### 1. Clone the Repository
```bash
git clone https://github.com/jaggehns/task-management-app.git
cd task-management-app
```
### 2. Copy .env.example into your own .env file

### 3. Install dependencies
```bash
yarn
```
### 4. Spin up docker containers
```bash
docker compose up --build
```
### 5. Host (vite-express - FE & BE)
```bash
localhost:3000
```
### 6. Destroy containers
```bash
docker compose down -v
```
## Scalability Considerations

### Challenges and Solutions

#### Large Data Volumes
- **Issue**: Displaying tens of thousands of tasks could degrade performance.
- **Solution**: 
  - Implemented pagination to load tasks in smaller chunks.
  - Backend handles sorting, searching, and pagination using optimized SQL queries.

#### Concurrent Access
- **Issue**: Multiple users might simultaneously create or edit tasks.
- **Solution**: 
  - Transactions ensure consistency and prevent race conditions. (Can prevent deadlocks but trade-off is speed)

#### High API Load
- **Issue**: Frequent API requests for sorting and searching.
- **Solution**: 
  - Debounced input reduces redundant API calls.
  - Search and filter operations are optimized in the database.

---

## Design Decisions

#### Default Sorting
- Tasks are sorted by `createdAt` in descending order by default to show the most recent tasks first.

#### Separation of Concerns
- **Business Logic**: Resides in the service layer to keep controllers and models lightweight.

#### Error Handling
- Centralized error handling ensures consistent API responses.
- Zod validation ensures inputs are validated at the earliest stage.

#### Frontend Optimizations
- Debounced search inputs and pagination improve responsiveness.

---

# Error Handling and Future Improvements

## Error Handling

### Frontend
#### User Feedback
- Errors are displayed as **toast notifications****.
- Form fields validate user inputs **before sending requests**.
- Backend validation errors are displayed to users for clarity.

#### Error Boundary
- A **React Error Boundary** handles unexpected UI crashes gracefully, ensuring the app remains stable for users.


### Backend
#### Input Validation
- Payloads are validated using **Zod schemas**.
- Invalid inputs return detailed **400 Bad Request** responses to guide users.

#### Database Errors
- Handled using **Prisma error codes** (e.g., `P2002` for unique constraint violations) to ensure consistent and helpful error messages.

#### Middleware
- Centralized error-handling middleware ensures **consistent API responses** across the application.

---

## Future Improvements

### Unit & E2E Tests
- You can only sleep well if you're code is tested!
- Guard against breaking changes from others working on your code

### Task Priority
- Add a **priority field** to tasks for better sorting and filtering options.

### Performance Enhancements
- Use **Redis caching** for frequently accessed data to reduce database load.

### Search Improvements
- Add **fuzzy search capabilities** to make search more flexible and user-friendly. (Optional)

### Frontend Enhancements
- Improve **accessibility** and **responsiveness** for mobile devices.

### Scalability
- **Database Sharding:** Implement database sharding to partition data across multiple databases, reducing load on individual nodes and enabling better performance for large datasets. This can be evaluated based on the growth of data and traffic.
- **Horizontal Scaling:** Scale the application horizontally by adding more instances of the backend service. This ensures better handling of increased API traffic and concurrent user requests.
- **Load Balancing:** Introduce load balancers to distribute traffic evenly across multiple instances, improving fault tolerance and reducing the risk of server overload.
- **Connection Pooling:** Optimize database connections by implementing connection pooling to efficiently handle multiple queries without overwhelming the database.
- **Asynchronous Processing:** Offload heavy or repetitive tasks, such as notifications or reports, to background job queues (e.g., RabbitMQ, Redis Queue) to free up server resources for real-time requests.

---

## Git Practices

### Commit History
- **Clear, descriptive commit messages** for better traceability.
  - Example: `feat: implement sorting by createdAt with descending order by default`.

### Branching
- Followed conventions like:
  - `feature/<name>` for new features.
  - `fix/<name>` for bug fixes.

---

