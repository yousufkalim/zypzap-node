var passport = require("passport");
var DiscordStrategy = require("passport-discord").Strategy;

const User = require("../../models/users");
var scopes = ["identify", "email", "guilds", "guilds.join"];

module.exports = (passport) => {
  passport.use(
    new DiscordStrategy(
      {
        clientID: "950251147254448168",
        clientSecret: "DVm_CV5GkVjfjh4PDFb7MSmS64UrNrXu",
        callbackURL: "http://localhost:5000/api/users/auth/discord/callback",
        scope: scopes,
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
