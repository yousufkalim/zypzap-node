// Init
require("dotenv").config();
const app = require("express")();
const port = process.env.PORT || 5000;
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
//var FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/users");
require("./database");
app.use(passport.initialize());
app.use(passport.session());
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
// Middleware
require("./middleware/common")(app);

// Routes
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});

///    login with Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ClientId,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (profile, done) {
  done(null, profile);
});

passport.deserializeUser(function (profile, done) {
  done(null, profile);
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", async (req, res) => {
  const user = req.user;
  return res.redirect(
    process.env.REACT_URL + `?SignupByGoogle=true&&user=${user}`
  );
});
app.get("/auth/google/failure", async (req, res) => {
  return res.send({ success: "failure" });
});

//////     LognIn with facebook

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:5000/auth/facebook/callback",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       return cb(null, profile);
//     }
//   )
// );
// app.get(
//   "/login/facebook",
//   passport.authenticate("facebook", {
//     scope: ["profile"],
//   })
// );
// app.get(
//   "/oauth2/redirect/facebook",
//   passport.authenticate("facebook", {
//     // successReturnToOrRedirect: "/auth/google/success",
//     failureRedirect: "/login",
//     failureMessage: true,
//   }),
//   function (req, res) {
//     const user = req.user;
//     res.redirect("https://www.w3schools.com");
//   }
// );
