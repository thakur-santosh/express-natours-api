const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({
  path: './config.env',
});

// DB connection
const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

// Port
const PORT = process.env.PORT || 3000;
// running server
app.listen(PORT, () => {
  console.log('Running Port', PORT);
});
