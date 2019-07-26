const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// @route   GET api/users/register
// @desc    Signup a new User
// @access  Public
router.post('/register', (req, res) => {
    console.log('user signup');

    const email = req.body.email;
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the email: ${email}`
            })
        }
        else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                fullname: req.body.firstname + " " + req.body.lastname,
                register_date: new Date()
            })
            console.log(newUser);
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })

        }
    })
});

// @route   GET api/users/login
// @desc    User Login
router.post('/login', cors({origin: ['http://localhost:3000', 'http://localhost:5000'], credentials: true }),
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// @route   GET api/users
// @desc    Get User Data, Check if User logged in
router.get('/', cors({origin: 'http://localhost:3000', credentials: true }), (req, res, next) => {
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

// @route   GET api/users/logout
// @desc    User logout
router.get('/logout', cors({origin: 'http://localhost:3000'}), function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router