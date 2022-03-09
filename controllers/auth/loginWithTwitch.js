var passport = require("passport");
var twitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const User = require("../../models/users");
// const scopes = ["user_friends", "manage_pages"];
module.exports = (passport) => {
  passport.use(
    new twitchStrategy(
      {
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: process.env.TWITCH_CALLBACK,
        scope: "user_read",
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
