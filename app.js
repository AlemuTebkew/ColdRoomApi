var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var logger = require('morgan');
const db=require('./config/database.js');
const cors=require('cors')
// importing router index file
var indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const farmerRouter = require('./routes/farmer');
const wholeSalerRouter = require('./routes/wholesaler');
const localAdminRouter = require('./routes/local-admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','*');
//   res.setHeader('Access-Control-Allow-Headers','Authorization');
//  // res.setHeader('Authorization','*');
//   next();

// })
app.use(cors)
app.use(logger('dev'));
app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//registering router
app.use('/admin',adminRouter)
app.use('/farmer',farmerRouter)
app.use('/wholesaler',wholeSalerRouter)
app.use('/localadmin',localAdminRouter)
app.use('/', indexRouter);
app.use('Images',express.static('Images'));


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
  // res.render('error');
});

module.exports = app;
 