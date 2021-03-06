var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bluebird = require('bluebird');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var hackathon = require('./routes/hackathon.route')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/hack')
.then(()=> { console.log(`Succesfully Connected to the
Mongodb Database  at URL : mongodb://127.0.0.1:27017/hack`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb 
Database at URL : mongodb://127.0.0.1:27017/hack`)})



// app.use(function(req, res, next) {
//   if (req.method === 'OPTIONS') {
//     console.log('!OPTIONS');
//     var headers = {};
//     // IE8 does not allow domains to be specified, just the *
//     // headers["Access-Control-Allow-Origin"] = req.headers.origin;
//     headers["Access-Control-Allow-Origin"] = "*";
//     headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
//     headers["Access-Control-Allow-Credentials"] = false;
//     headers["Access-Control-Max-Age"] = '86400'; // 24 hours
//     headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
//     res.writeHead(200, headers);
//     res.end();
//   }
//   else{
//     console.log('!OPTIONS');
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
//   }
  
// });

app.use(function(req, res, next) {
  console.log('!OPTIONS');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.options("*",function(req,res,next){
//   res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    //other headers here
//     res.status(200).end();
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/hackathon', hackathon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
