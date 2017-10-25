const http = require('http');
const parseUrl = require('parseurl');
const path = require('path');
const express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '')));

app.all('/api/track', (req, res) => {  
  res.sendFile(path.join(__dirname, 'music/', req.body.track));
})

app.get('*', (req, res) => {
  res.sendFile('index.html');
});

console.log('\x1b[36m%s\x1b[0m', 'Music app listening on port 3010');
app.listen(3010);
