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
      async (accessToken, refreshToken, profile, done) => {
        console.log("dcndj", profile);
        const user = await User.find({ userId: profile.id });
        if (user.length === 0) {
          console.log("gschvjhbckh");
          const newUser = new User();
          newUser.username = profile.display_name;
          newUser.userId = profile.id;
          newUser.role = "User";
          const eMail = profile.email;
          console.log("EMAIL", eMail);
          newUser.email.push("ALI@GMAIL.COM");
          console.log("new User", newUser);
          await newUser.save();
          console.log("new User", newUser);
          return done(null, newUser);
        } else {
          console.log("old user", user);
          return done(null, user);
        }
      }
    )
  );
};
