# Todo List Application
This is a Todo List application built with Spring Boot. It allows users to manage their tasks efficiently, with a RESTful API for CRUD operations.

## Technologies Used
Spring Boot: A framework to create standalone Spring applications.
Maven: Dependency management and build tool.
Java: The programming language used for development.

## Features
Create, Read, Update, and Delete (CRUD) tasks

## Prerequisites
Java 11 or higher
Maven

## How to Run the Project
1. Clone the repository:

2. Build the project

3. Run the application

### API Endpoints
1. Get All Todos
Endpoint: GET /api/tasks
Description: Retrieves a list of all todos.

2. Get Todo by ID
Endpoint: GET /api/tasks/{id}
Description: Retrieves a todo by its ID.
Parameters:
id: The ID of the todo.

3. Create a New Todo
Endpoint: POST /api/tasks
Description: Creates a new todo.
Body:
```
{
  "id": "Todo id",
  "name": Todo Name,
  "description": "Todo Description",
}
```

4. Update an Existing Todo
Endpoint: PUT /api/tasks/{id}
Description: Updates a todo by its ID.
Parameters:
id: The ID of the todo.
Body:
```
{
  "id": "Todo id",
  "name": Todo Name,
  "description": "Todo Description",
}
```

5. Delete a Todo
Endpoint: DELETE /api/tasks/{id}
Description: Deletes a todo by its ID.
Parameters:
id: The ID of the todo.

## Testing the APIs
You can use tools like Postman or curl to test the APIs. Here are some examples:

Get All Todos:
curl -X GET http://localhost:8080/api/tasks

Get Todo by ID:
curl -X GET http://localhost:8080/api/tasks/{id}

Delete a Todo:
curl -X DELETE http://localhost:8080/api/tasks/{id}
