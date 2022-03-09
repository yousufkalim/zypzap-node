var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/users");
// const scopes = ['id', 'displayName', 'photos', 'email'];
// const profileFields =['id', 'displayName', 'photos', 'email'];
module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/api/users/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
