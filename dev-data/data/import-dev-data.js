const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const fs = require('fs');
const path = require('path');

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

const dirPath = path.join(__dirname, '/tours-simple.json');
const tours = JSON.parse(fs.readFileSync(dirPath, 'utf8'));

const importTours = async () => {
  try {
    await Tour.create(tours);
    console.log('Inserted Successfully');
  } catch (error) {
    console.log(error);
  }
};

const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted Successfully');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] == '--import') {
  importTours();
} else if (process.argv[2] == '--delete') {
  deleteTours();
}

console.log(process.argv);
