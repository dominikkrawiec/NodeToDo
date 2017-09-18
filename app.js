var express = require('express');
var ejs = require('ejs');
var toDoController = require('./controllers/toDoController');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

toDoController(app);
app.listen(8080);
