const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('./passport/localStrategy')
const morgan = require('morgan');
const session = require('express-session');
const PORT = 5000;
const flash = require('connect-flash');
const app = express();


// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true };
app.use(cors(corsOptions));


// Connect to Mongo
mongoose
  .connect('mongodb://localhost:27017/movieapp', { 
    useNewUrlParser: true,
    useCreateIndex: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Sessions
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Passport for User auth
passport.serializeUser(function(user, done) {
  done(null, { user: user });
});
passport.deserializeUser(function(user, done) {
  done(null, { user: user });
});
passport.use(LocalStrategy); // Load Local Strategy for Passport
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Use Routes
app.use('/api/movies', require('./api/movies'));
app.use('/api/users', require('./api/users'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));