var passport = require("passport");
var DiscordStrategy = require("passport-discord").Strategy;

const User = require("../../models/users");
var scopes = ["identify", "email", "guilds", "guilds.join"];
passport.serializeUser(function (profile, done) {
  done(null, profile);
});

passport.deserializeUser(function (profile, done) {
  done(null, profile);
});
module.exports = (passport) => {
  passport.use(
    new DiscordStrategy(
      {
        clientID: "950251147254448168",
        clientSecret: "DVm_CV5GkVjfjh4PDFb7MSmS64UrNrXu",
        callbackURL: "http://localhost:5000/api/users/auth/discord/callback",
        scope: scopes,
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("dcndj", profile);
        const user = await User.find({ userId: profile.id });
        if (user.length === 0) {
          const newUser = new User();
          newUser.username = profile.username;
          newUser.userId = profile.id;
          const eMail = profile.email;
          newUser.email.push(eMail);
          newUser.role = "User";
          await newUser.save();
          console.log("new User", newUser);
          return cb(null, newUser);
        } else {
          console.log("old user", user);
          return cb(null, user);
        }
      }
    )
  );
};
