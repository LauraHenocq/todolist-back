# Todolist Backend

This project is a backend built with Nest, Typescript and MongoDB to get, create, delete and update tasks.

## Documentation

[Architecture](docs/doc.md)

## Project setup

### 1.

```
npm install
```

### 2.

Create a file `.env`.

Init it with the variable PORT to define which port do you want to use (3000 by default) and the variable MONGO_URI (MongoDB database url, see the value in the docker-compose.yml file).

Then complete it with the private values for your database.

### 3.

Run the project with docker by using the command `docker-compose up --build`, then go the app on `http://localhost:3000/tasks`.


## Tests

```bash
# unit tests
npm run test

# e2e tests
$ npm run test:e2e
```

## Test the endpoint with postman

To get the tasks (for exemple), you can use Postman. 
Do a GET request on the url http://localhost:3000/tasks and see the result you get