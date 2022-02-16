var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../models/users");
const router = require("express").Router();
const pass_port = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ClientId,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:5000/api/users/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const email = profile.email;
      console.log("Profile", profile);
      return done({ profile });
    }
  )
);

module.exports = pass_port;
