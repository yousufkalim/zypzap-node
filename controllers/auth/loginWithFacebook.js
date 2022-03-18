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
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
