### Looking Forward

- Backend
    - ExpressJS
    - SQL
    - Sqlite3 + PostgreSQL
    - Sequelize
- 1st Half of Project
    - Organize database
    - Create backend server
- Frontend
    - React + Redux
- 2nd Half of Project
    - Create UI using data from backend

## Creating a server

```js
const express = require('express');

const app = express();

/* All sorts of stuff */

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
```

Make sure you `npm install express` first!

## Creating routes

```js
app.get('/users/:userId', (req, res) => {
  /* All sorts of stuff */
});
```

## Parsing the request's body

```js
app.use(express.json());
```

## Parsing info from URLs

```js
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
});
```

Whatever you set to `:valueName` gets saved as a key-value pair on the `req.params` object

## Sending responses

```js
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.status(200).send(`User details for userId: ${userId}`);
});
```

With Express, `res.send()` and `res.json()` both send the response, as well as call `res.end()` so you don't have to!

---

## Express Request/Response Objects

Express has built in properties and methods to make dealing with requests and responses easier

### Request Object `req`

- req.body - automatically gives us the parsed body of the request if it's JSON
  - the app must use `express.json()`

```js
app.use(express.json());
```

- req.query - gives us query string parameters in an object

```js
fetch('http://localhost:5000/items?coffee=Starbucks&music=lofi', {
  method: 'GET',
});


// req.query
{
  coffee: 'Starbucks',
  music: 'lofi',
};

console.log(req.query.music) // lofi
```

- req.params - gives us route parameters in an object

```js
fetch('http://localhost:5000/locations/Washington/Seattle', {
    method: 'POST'
})

app.post('/locations/:state/:city', ...)


// req.params
{
  state: 'Washington',
  city: 'Seattle',
};

console.log(req.params.city) // Seattle
```

### Response Object `res`

- res.status() - set the HTTP status code for the response
- res.send() - send HTTP response, Content-Type res header is auto set depending on argument passed in 
- res.json() - send JSON response

```js
res.status(200);

res.json({ some: 'data' });
// or
res.send('some data');
```

Can be chained!

```js
res.status(404).send('Page Not Found');
```

## Middleware

Express is "essentially a series of middleware function calls"

## What is Middleware?
- Express allows us to define a stack of actions that follows the request and response cycle. These stack of actions are the middlewares, function code that could be executed if certain conditions are met between receiving a request and sending back the response

- By Definition: any function that takes in `req`, `res`, and `next` as arguments

## How does Middleware work?

Express operates as a stack of middleware functions. It will execute these functions in order upon receiving a request, and stops executing once a response is sent back.

We can add layers to the middleware stack by creating our own middleware functions.

```js
// since this takes req, res, and next, it's an Express Middleware!

const myMiddleware = (req, res, next) => {
  console.log("I'm a middleware function!");
  next();
};
```

To get Express to use this function, we can pass it directly to a route handler

```js
app.get('/', myMiddleware);

// we can also continue to handle the request within the same handler

app.get('/', myMiddleware, (req, res) => {
  // Handling of the request
});
```

We can also pass it to `app.use()`. Anytime you've passed something to `app.use()`, you were adding a layer to the Express Middleware Stack! These are all examples of using middleware

```js
app.use(express.json());
app.use(express.static('/catPhotos'));
app.use(myMiddleware);
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
```

Can take in a path as the first argument or defaults to "/" if not specified.

If it's a built-in middleware (`express.json()`), then you don't have to worry about calling `next()`, it's already being done for you. If you are making your own middleware function, you **_must_** call `next()`

## next()

Calling `next()` will tell express to "return" out of our current function and run the next **_applicable_** function.

```js
const mid1 = (req, res, next) => {
  console.log("Hey I'm mid1!");
  next();
};

const mid2 = (req, res, next) => {
  console.log("Hey I'm mid2!!");
  next();
};

app.get('/', mid1, mid2);
```

When making a GET request to `/`

```md
# console will print

Hey I'm mid1!
Hey I'm mid2!!
```

Similarly

```js
const myMid = (req, res, next) => {
  console.log("Hey look I'm printing!");
  next();
};

app.get('/', myMid, (req, res) => {
  console.log('Wow I printed after myMid!');
  res.send('This is the / response');
});
```

```md
# console will print

Hey look I'm printing!
Wow I printed after myMid!!

# browser will display

This is the / response
```

![express-middleware-chain](https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/module-04/week-10/assets/express-middleware-chain.png)

## Error Handling Middleware

Express handles errors through middleware.

## How to use error handling middleware

Error handling middleware _MUST_ have 4 parameters, `err`, `res`, `req`, and `next`, and `err` _NEEDS_ to be the first parameter. This is the only way for Express to recognize something as error handling middleware.

Just like with any other custom middleware, we pass our error handlers into `app.use()` so it can be ran on every request. Error handler should be defined after all other middleware and route handlers.

```js
app.use(express.json())
app.use(myMiddleware)

app.get(...)

app.get(...)

app.post(...)

app.delete(...)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.send('Whoops! Some error happened I guess?')
})
```

## Express Router

Express Routers allow us to direct traffic into different parts of our application. This enables us to have a more organized file structure, making it much easier to develop and maintain. Instead of all requests being handled in app.js, we can handle user requests in user.js, dog requests in dog.js, and so on.

Express Router is available through Express, no extra install required. We must remember to export our router and the bottom of the file so we can import it into app.js

```js
// a file that is not app.js
const express = require('express');

const router = express.Router();

/* Routing code goes here */

module.exports = router;
```

Routers are commonly stored in a "routes" folder. Within that folder you create a file to handle your routes. To create a route, do as we normally would with app.methodName(), but use router instead.

```js
// routes/pokemon.js

// url: localhost:5000/pokemon
router.get('/', (req, res) => {});

// url: localhost:5000/pokemon/pikachu
router.post('/:name', (req, res) => {});
```

Finally, in app.js, we import our routers and `app.use()` them. The syntax is similar to `express.static()`, the first argument is the url path the user should type into the browser, the second is the router we've created.

```js
// app.js
const express = require('express');

const pokemon = require('./routes/pokemon');

const app = express();

app.use('/pokemon', pokemon);
```

Just like with `express.static()`, the url path Does Not have to match the file we're routing from. It's simply the convention and tends to be easier to work with.

```js
// same app.js

app.use('/palworld', pokemon);
```
