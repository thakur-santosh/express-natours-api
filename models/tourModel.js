const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour must have a difficulties'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantities: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A Tour must have Summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Image required'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
