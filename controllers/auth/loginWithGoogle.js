var passport = require("passport");
const User = require("../../models/users");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
passport.serializeUser(function (profile, done) {
  done(null, profile);
});

passport.deserializeUser(function (profile, done) {
  done(null, profile);
});
module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.ClientId,
        clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:5000/api/users/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) =>{
        console.log("dcndj", profile);
        const user = await User.find({ userId: profile.id });
        if (user.length === 0) {
          const newUser = new User();
          newUser.username = profile.given_name;
          newUser.userId = profile.id;
          newUser.role = "User";
          const eMail = profile.email;
          newUser.email.push(eMail);
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
