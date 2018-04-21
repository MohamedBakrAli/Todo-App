var express = require('express');

var  app = express();
var todocontroller = require('./controllers/todocontroller');

// set template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire todocontroller
todocontroller(app);


app.listen(3000);
console.log('You listen in port 3000');
