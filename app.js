const express = require('express');
const todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//routes to static files
app.use("/public", express.static(__dirname + '/public'));﻿

todoController(app);

//listen to port
var port = process.env.PORT || 8080;
app.listen(port);
console.log('You are listening on port: ' + port);
