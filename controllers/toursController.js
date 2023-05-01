// const fs = require('fs');
// const path = require('path');

const Tour = require('../models/tourModel');

// const dirPath = path.join(__dirname, '../dev-data/data/tours-simple.json');
// const tours = JSON.parse(fs.readFileSync(dirPath, 'utf8'));

// exports.checkId = (req, res, next, value) => {
//   console.log(req.params.id, value);
//   if (value > tours.length) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Invalid Body',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.aliasingTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price,difficulty';

  next();
};

exports.postTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    // build the query
    // 1) filtering
    const queryObj = { ...req.query };
    const excludesFields = ['page', 'sort', 'limit', 'fields'];
    excludesFields.forEach((field) => delete queryObj[field]);
    // 1.b) advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // create query promise object by not using await here so that we can attach the other methods also
    // const tours = await Tour.find(req.query);
    let query = Tour.find(JSON.parse(queryString));

    // 2) sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('createdAt');
    }
    // fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    // pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    query = query.skip(Number(skip)).limit(Number(limit));

    if (req.query.page) {
      const totalTour = await Tour.countDocuments();
      if (skip >= totalTour) throw new Error('Page does not exist');
    }

    // execute query
    const tours = await query;

    // send response
    res.status(200).json({
      status: 'success',
      result: tours,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: 'Deletion failed',
    });
  }
};
