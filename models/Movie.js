const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema for a Movie
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  plot: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
});

module.exports = Movie = mongoose.model('movie', MovieSchema);