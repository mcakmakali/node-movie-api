const createError = require('http-errors');
require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//swagger 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//middleware
const verifyMiddleware = require("./middleware/verify-token");


const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const users = require('./routes/users');
const { verify } = require('crypto');


const app = express();

//Swagger 
const swaggerDocument = require("./swagger.json");
app.use('/api-console', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//DB Connection
const db = require("./helper/db")();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




//movies
app.use('/api/movies', movie);
app.use('/api/users', users);






/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
 app.get('/hello', (req, res) => {
  res.send('Hello World!');
});






// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message , code: err.code, status: err.status }});
});

module.exports = app;
