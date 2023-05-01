const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRouter');

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

module.exports = app;
