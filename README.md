# Programming Languages API

RESTful API for programming languages. 
Deployed at: [kat-languages-api.herokuapp.com](http://kat-languages-api.herokuapp.com)

_Routes:_
1. GET /languages - returns all languages in the system.
1. GET /languages/:id - returns an individual language based on id (uuid v4.)
1. POST /languages - post a new language. 
  - Schema: { 
    name,
    use, 
    created, 
    createdBy, 
    basedOn, 
    rank
  }
1. PUT /languages/:id - return a specific language based on id. All fields are necessary to update. 
1. DELETE /languages/:id - remove a language based on id. 