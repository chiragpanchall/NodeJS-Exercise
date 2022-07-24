const passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "clientID",
    clientSecret: "clientSecret",
    callbackURL: "http://localhost:8080/auth/facebook/callback/"
},
  function(accessToken, refreshToken, profile, cb) {
    return cb(null,profile)
  }
));



passport.serializeUser(function(user, done) {
    done(null, user);
});               

passport.deserializeUser(function(id, done) {
        done(err, user); 
});

