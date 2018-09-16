var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')

var config = require('./config/mysql_config.js');

var connection = mysql.createConnection(config);


connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/skeleton', function(req, res, next) {
  res.sendFile(__dirname + '/public/html/skeleton.html');
});

app.get('/crud', function(req, res, next) {
  res.sendFile(__dirname + '/public/html/crud_trial.html');
});

app.get('/crud2', function(req, res, next) {
  res.sendFile(__dirname + '/public/html/crud2.html');
});

app.get('/crud3', function(req, res, next) {
  res.sendFile(__dirname + '/public/html/crud3.html');
});


app.get('/createCC', function(req, res, next) {
  res.sendFile(__dirname + '/public/html/create_costCenter.html');
});
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
