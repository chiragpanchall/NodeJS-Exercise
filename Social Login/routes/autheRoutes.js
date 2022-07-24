const express = require('express');
const app = express();
const cors  = require('cors');
const routers = express.Router();
const loginController = require('../controller/login');
const signupController = require('../controller/signup');
const passport = require('passport');
const { configJWT } = require('./passport');
require('./googleAuth');
require('./facebookAuth');
require('./githubAuth');
require("./passport");


app.use(passport.initialize());
app.use(cors());
configJWT();


routers.post('/login',loginController.getUser);



routers.post('/signup',signupController.addUser);
routers.get('/dashboard',passport.authenticate('jwt',{session:false}),loginController.dashboard);

// Google signin
routers.get('/auth/google', 
      passport.authenticate('google',{scope : ['email', 'profile']})
);

routers.get('/auth/google/callback', 
  passport.authenticate('google',
  {failureRedirect : 'http://localhost:8080'}), 
  function(req,res){
    loginController.googleLogin(req,res);   
});

// Facebook signin
routers.get('/auth/facebook', 
      passport.authenticate('facebook') 
);

routers.get('/auth/facebook/callback', 
  passport.authenticate('facebook',
  {failureRedirect : 'http://localhost:8080'}), 
  function(req,res){
    loginController.facebookSignIn(req,res);   
});


//Github signin
routers.get('/auth/github', 
      passport.authenticate('github',{scope : ['email', 'profile']})
);

routers.get('/auth/github/callback', 
  passport.authenticate('github',
  {failureRedirect : 'http://localhost:8080'}), 
  function(req,res){
    loginController.githubSignIn(req,res);   
});




module.exports = routers;