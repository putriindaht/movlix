# Movie API Documentation

# Endpoints:

List of availabele endpoints:

- POST / movies
- GET / movies
- GET / movies/:id
- DELETE / movies:id
- GET / genres
- POST / register
- POST / login
- PUT / movies/:id
- PATCH movies/:id

## 1. POST/movies

### Description:

- Create a new movie data

### Request:

- Headers:

```json
{
  "Content-Type": "application/json"
}
```

```json
{
  "access_token": "string"
}
```

- Body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer"
}
```

### Response:

- _Response (201 - Created)_

```json
{
  "statusCode": 201,
  "data": {
    "id": "integer",
    "title": "string",
    "synopsis": "string",
    "trailerUrl": "string",
    "imgUrl": "string",
    "rating": "integer",
    "genreId": "integer",
    "authorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": ["String"]
}
```

## 2. GET/movies

### Description:

- Get all movie from database

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data":
        [
            {
                "id": "integer",
                "title": "string",
                "synopsis": "string",
                "trailerUrl": "string",
                "imgUrl": "string",
                "rating": "integer",
                "genreId": "integer",
                "authorId": "integer",
                "createdAt": "date",
                "updatedAt": "date",
                "User": {
                    "id": "integer",
                    "username": "string",
                    "email": "string",
                    "role": "string",
                    "phoneNumber": "string",
                    "address": "string",
                    "createdAt": "date",
                    "updatedAt": "date"
                }
            },
            ...
        ]
}
```

## 3.GET/movies/:id

### Description:

- Get movie from database by id

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

- Params:

```json
{
  "id": "integer"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": {
    "id": "integer",
    "title": "string",
    "synopsis": "string",
    "trailerUrl": "string",
    "imgUrl": "string",
    "rating": "integer",
    "genreId": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

- _Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Movie Not Found"
}
```

## 4.DELETE/movies/:id

### Description :

- Delete movie by id

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": {
    "id": "integer",
    "title": "string",
    "synopsis": "string",
    "trailerUrl": "string",
    "imgUrl": "string",
    "rating": "integer",
    "genreId": "integer",
    "authorId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Movie {movie.title} Successfully deleted"
}
```

- _Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Movie Not Found"
}
```

## 5.GET/genres

### Description:

- Get all genres from database

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "integer",
      "name": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

## 6.POST/register

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (201 - Created)_

```json
{
  "statusCode": 201,
  "data": {
    "id": "integer",
    "email": "string"
  }
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": ["string"]
}
```

## 7.POST/login

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
{
    "statusCode": 200,
    "access_token": "string",
    "user": {
        "id": "integer",
        "email": "string",
        "username": null/"string",
        "role": "string"

    }
}
```

- _Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

## 8.PUT/movies/:id

### Description:

- Edit/update movie by Id

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "string"
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": ["String"]
}
```

## 9.PATCH/movies/:id

### Description:

- Update status by id

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "string"
}
```

## 10.GET/histories

### Description:

- Get data history or logs

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "updatedBy": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

## 11.POST /pub/register

### Description:

- Register customer

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (201 - Created)_

```json
{
  "statusCode": 201,
  "message": "Success register",
  "customer": {
    "id": "integer",
    "email": "string"
  }
}
```

- _Response (400 - Bad Request)_

```json
{
  "statusCode": 400,
  "message": ["string"]
}
```

## 12.POST /pub/login

### Description

- Login for customer

### Request

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

### Response

- _Response (200 - Ok)_

```json
{
  "statusCode": 200,
  "access_token": "string",
  "user": {
    "id": "integer",
    "email": "string",
    "role": "string"
  }
}
```

- _Response (401 - Unauthorized)_

```json
{
  "statusCode": 401,
  "message": "Invalid email or password"
}
```

## 13.POST /pub/glogin

### Description:

- For login with google login

## 14.GET /pub/movies

### Description:

- Get all movie from database

### Response:

- _Response (200 - OK)_

```json
{
    "data":
        [
            {
                "id": "integer",
                "title": "string",
                "synopsis": "string",
                "trailerUrl": "string",
                "imgUrl": "string",
                "rating": "integer",
                "genreId": "integer",
                "authorId": "integer",
            },
            ...
        ]
}
```

## 15.GET /pub/movies/:id

### Description:

- Get movie from database by id

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

- Params:

```json
{
  "id": "integer"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "statusCode": 200,
  "data": {
    "id": "integer",
    "title": "string",
    "synopsis": "string",
    "trailerUrl": "string",
    "imgUrl": "string",
    "rating": "integer",
    "genreId": "integer",
    "authorId": "integer",
    "status": "string",
    "Genre": {
      "id": "integer",
      "name": "string"
    }
  },
  "qrCode": "text"
}
```

- _Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Movie Not Found"
}
```

## 16.GET /pub/bookmarks

### Description:

- Get data bookmarks

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (200 - OK)_

```json
{
  "data": [
    {
      "id": "integer",
      "title": "string",
      "synopsis": "string",
      "trailerUrl": "string",
      "imgUrl": "string",
      "rating": "integer",
      "genreId": "integer",
      "authorId": "integer",
      "status": "string",
      "Bookmarks": [
        {
          "id": "integer",
          "MovieId": "integer",
          "CustomerId": "integer"
        }
      ]
    }
  ]
}
```

## 17.POST /pub/bookmarks/:movieId

### Description:

- Add bookmark

### Request:

- Headers:

```json
{
  "access_token": "string"
}
```

### Response:

- _Response (201 - OK)_

```json
{
  "id": "integer",
  "MovieId": "integer",
  "CustomerId": "integer"
}
```

- _Response (404 - Not Found)_

```json
{
  "statusCode": 404,
  "message": "Movie Not Found"
}
```

## Global Error

### Response:

- Response (500 - Internal Server Error)

```json
{
  "statusCode": 500,
  "message": "Internal Server Error"
}
```
