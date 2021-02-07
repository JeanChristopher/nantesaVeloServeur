var express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');


var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// supporting a post operation thaht'll allow users to sign up on the system
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      // we authenticate the user
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful ! '});
      })
    }
  })  
});

router.post('/login', passport.authenticate('local'),(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in '});
  
});

router.get('/logout', (req, res) =>{
  if (req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in ! ')
    err.statusCode = 403;
    next(err);
  }
})

module.exports = router;
