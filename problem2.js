
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});


// Custom middleware function
function myLogger(req, res, next) {
  console.log("LOGGED:", req.method, req.url);
  next();
}

app.use(myLogger);


app.use(middleware1);
app.use(middleware2);
