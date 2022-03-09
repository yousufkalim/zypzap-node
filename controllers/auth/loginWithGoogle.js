var passport = require("passport");
const User = require("../../models/users");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
// const session = require("express-session");
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.ClientId,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:5000/api/users/auth/google/callback",
        scope: ["profile"],
        // state: true,
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
passport.serializeUser(function (profile, done) {
  done(null, profile);
});

passport.deserializeUser(function (profile, done) {
  done(null, profile);
});
