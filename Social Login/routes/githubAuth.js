const passport = require('passport');

var GithubStrategy = require('passport-github2').Strategy;

passport.use(new GithubStrategy({
    clientID: "clientID",
    clientSecret: "clientSecret",
    callbackURL: "http://localhost:8080/auth/github/callback"
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

