var passport = require("passport");
var DiscordStrategy = require("passport-discord").Strategy;

const User = require("../../models/users");
var scopes = ["identify", "email", "guilds", "guilds.join"];

module.exports = (passport) => {
  passport.use(
    new DiscordStrategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_CALLBACK,
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
