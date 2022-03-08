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
      async (accessToken, refreshToken, profile, done) => {
        console.log("dcndj", profile);
        const user = await User.find({ userId: profile.id });
        if (user.length === 0) {
          console.log("gschvjhbckh");
          const newUser = new User();
          newUser.username = profile.displayName;
          newUser.userId = profile.id;
          newUser.role = "User";
          const eMail = profile.emails[0].value;
          //console.log("EMAIL", eMail);
          newUser.email.push(eMail);
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
