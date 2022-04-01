// Init
require("dotenv").config();
const app = require("express")();
const port = process.env.PORT || 5000;
const session = require("express-session");
const User = require("./models/users");

// Friday, March 25, 2022 11:50 a.m.


require("./database");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "bla bla bla",
  })
);
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
