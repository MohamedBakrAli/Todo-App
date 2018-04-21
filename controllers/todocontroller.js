var  bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://test:test@ds249415.mlab.com:49415/todo_hmo');
var todoschema = new mongoose.Schema({
  item : String
});
var Todo = mongoose.model('Todo', todoschema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var data =[{item : 'hh 1'},{item : 'hh 2'},{item : 'hh 3'}];

module.exports = function(app){
  app.get('/todo',function(req, res){
    // get data from the mongodb
    Todo.find({},function(err,data){
        if (err)
          throw err;
        res.render('todo',{todos: data});
      });
  });

  app.post('/todo',urlencodedParser,function(req, res){
    var newtodo = Todo(req.body).save(function(err, data){
      if (err)
          throw err;
      res.json(data);
    })

  });

  app.delete('/todo/:item',function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if (err)
        throw err;
      res.json(data);
    });
  });
};
