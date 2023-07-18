const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');

const app = express();
//middleware
app.use(express.json());
app.use(morgan('dev'));

// const customMiddleware = (req, res, next) => {
//   console.log('custom middleware called');
//   next();
// };

// app.use(customMiddleware);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
});

module.exports = app;
