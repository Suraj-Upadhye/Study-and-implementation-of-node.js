// file: myModule.js
module.exports = function greet() {
    console.log("Hello from module");
  };
  

const greet = require('./myModule');
greet();
  

// Async
fs.readFile('file.txt', (err, data) => {
    console.log(data.toString());
  });
  


const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(3000, () => console.log("Server running on port 3000"));




const express = require('express');
// const app = express();
app.use(express.json());

app.get('/books', (req, res) => {
  res.send("GET Request");
});

app.post('/books', (req, res) => {
  res.send("POST Request with data: " + JSON.stringify(req.body));
});

app.listen(3000);


