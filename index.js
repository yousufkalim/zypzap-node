// Init
require("dotenv").config();
const app = require("express")();
const port = process.env.PORT || 5000;
const passport = require("passport");

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

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// Server
app.listen(port, () => {
  console.log(`Server is running at port ${port} :)`);
});

