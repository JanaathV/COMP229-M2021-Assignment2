import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose, { mongo } from 'mongoose';

//Modules for Authentication
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import cors from 'cors';

//Authentication Objects

let localStrategy = passportLocal.Strategy;
import User from '../Models/user';

// Module for auth messaging and error management
import flash from 'connect-flash';

import indexRouter from '../Routes/index';
import clothingRouter from '../Routes/clothing';

// App Configuration

const app = express();
export default app;

// DB Configuration
import * as DBConfig from './db';
mongoose.connect(DBConfig.LocalURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection; 
db.on("error", function()
{
  console.error("connection error");
});

db.once("open", function()
{
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, "../../node_modules")));

// Add support for cors

app.use(cors());

// Setup Express Session
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized: false,
  resave: false
}));

//Routing happens here
app.use('/', indexRouter);
app.use('/clothing-list', clothingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next:express.NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
