# Movie App

> Movie App for https://github.com/ironhack/movies-interview-challenge

Database: MongoDB
Frameworks: Express, React

## Quick Start


```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

APIs

| Tables        | Action          | Desc  |
| ------------- |:-------------:| -----:|
| localhost:5000/api/movies      | GET | Get All Movies |
| localhost:5000/api/movies/:id      | GET      |   Get a Movie by Id |
| localhost:5000/api/movies/:sort/:limit/:skip | GET      |    Get Movies; Set Sort, Limit number of Movies & Skip Movies |
| localhost:5000/api/movies/add      | POST      |   Add a new Movie, Movie Data: {title: text, director: text,score: number[between 1-3],release_date: date,plot: text} |
| localhost:5000/api/movies/update/:id      | POST     |   Update a Movie by Id |
| localhost:5000/api/movies/delete/:id      | POST     |   Delete a Movie by Id |

## App Info
Using Passport for User Auth
### Author

Dinçer
