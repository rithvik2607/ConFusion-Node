var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/users');

router.use(bodyParser.json());

const e = require('express');

router.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Registration successful!', success: true});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req,res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({status: 'You are successfully logged in!', success: true});
});

router.get('/logout', (req,res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
