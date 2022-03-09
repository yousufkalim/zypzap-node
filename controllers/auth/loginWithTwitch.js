var passport = require("passport");
var twitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const User = require("../../models/users");
// const scopes = ["user_friends", "manage_pages"];
module.exports = (passport) => {
  passport.use(
    new twitchStrategy(
      {
        clientID: "twrs78ppd3ka8opc1mysqc6zyde7c2",
        clientSecret: "kepao2vzmfql0y8arj7z4n215dnp7v",
        callbackURL: "http://localhost:5000/api/users/auth/twitch/callback",
        scope: "user_read",
      },
      function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );
};
