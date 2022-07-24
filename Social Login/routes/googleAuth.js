const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "clientID",
    clientSecret: "clientSecret",
    callbackURL: "http://localhost:8080/auth/google/callback"
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

