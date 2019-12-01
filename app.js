// cai routing
const express = require("express");
const config = require("config");
var favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const cors = require('cors')
const session = require('express-session')
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const messages = require('express-messages')
const passport = require('passport');
const i18n = require('i18n');
const LocalStrategy = require('passport-local').Strategy;
var url = require('url');
var http = require('http');
require('dotenv').config();
const app = express()

// body parser

app.use(bodyParser.json()); // de lay du lieu trong body cua post method, lay du lieu trong form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cấu hình session
app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
const engine = require('ejs-locals');
app.engine('ejs', engine);
app.use(session({
  key: 'user_sid',
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(i18n.init);
// Languages
i18n.configure({
  locales:['en', 'vi'],
  defaultLocale: 'vi',
  directory: __dirname + '/languages',
  cookie: 'lang'
});

app.use('/change-lang/:lang', (req, res) => { 
      res.cookie('lang', req.params.lang, { maxAge: 900000 });
      console.log(req.cookies.lang);
      res.redirect('back');
});
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  res.locals.logged = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.all("*", function (req, res, next) {  // runs on ALL requests
  req.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  res = encodeURI(req.fullUrl);
  console.log(res);
      next()
});
const mountRoutes = require('./routes');
mountRoutes(app);


app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});
app.use( function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }
  return next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
//start server
var server = app.listen(3000, () => {
    console.log('App listeningnodfe on port 3000!');
});