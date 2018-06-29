const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

//Connect to db
mongoose.connect('mongodb://jay:test123@ds257590.mlab.com:57590/todostestapp');

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    //fetch all the todos from mongodb
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //save the todo in mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    //delete the todo from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if(err) throw err;
      res.json(data);
    });
  });

};
