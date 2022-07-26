const passport = require('passport');
const User = require('../model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

exports.configJWT = () => {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secretJsonToken'; 
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(done);
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
