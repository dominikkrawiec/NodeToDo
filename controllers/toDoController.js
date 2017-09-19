var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyparser.urlencoded({extenden: false});

// Connect to the database
mongoose.connect('mongodb://test:test@ds141434.mlab.com:41434/todo');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

app.get('/todo', function(req,res){
  // get data from database and send to the view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodedParser, function(req,res){
  // add item do the database

  Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  });

});

app.delete('/todo/:item', function(req,res){
  Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(
    function(err, data) {
      if(err) throw err;
      res.json(data);
    }
  );

});
};
