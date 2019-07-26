const express = require('express');
const router = express.Router();

// Movie Model
const Movie = require('../models/Movie');

// @route   GET api/movies
// @desc    Get All Movies
// @access  Public
router.get('/', (req, res) => {
    Movie.find()
    .sort({ date: -1 })
    .then(movies => res.json(movies));
});

// @route   GET api/movies/:sort/:limit/:count
// @desc    Get List of Movies; sort by Date (date), by Title(title), Score(score), Release(release_date); limit & skip Movies
// @access  Public
router.get('/:sort/:limit/:skip', (req, res) => {
    Movie.find()
    .sort({ [req.params.sort] : -1 })
    .limit(parseInt(req.params.count))
    .skip(parseInt(req.params.skip))
    .then(movies => res.json(movies));
});

// @route   GET api/movies/:id
// @desc    Get Requested Movie by Movie id
// @access  Public
router.get('/:id',(req, res) => {
    Movie.findById(req.params.id)
        .then(movies => res.json(movies));
  });

// @route   POST api/movies/add
// @desc    Add a new Movie
// @access  Private
router.post('/add',(req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    poster: req.body.poster,
    director: req.body.director,
    release_date: req.body.release_date,
    score: req.body.score,
    plot: req.body.plot,
    date: new Date(),
  });
  newMovie.save().then(movie => res.json(movie));
});

// @route   POST api/movies//update/:id
// @desc    Update a Movie by Movie id
// @access  Private
router.post('/update/:id',(req, res) => {
    Movie.findById(req.params.id,(err, movie) => {
        if (!movie)
            res.status(404).send('data is not found');
        else
            movie.title = req.body.title;
            movie.poster = req.body.poster;
            movie.director = req.body.director;
            movie.release_date = req.body.release_date;
            movie.score = req.body.score;
            movie.plot = req.body.plot;

            movie.save().then(movie => {
                res.json('Movie updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// @route   DELETE api/movies/:id
// @desc    Delete A Movie Entry
// @access  Private
router.delete('/delete/:id',(req, res) => {
  Movie.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;