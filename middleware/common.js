// Init
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

// Common Middleware
module.exports = (app) => {
  // app.use(cors());

  app.use(cors({ credentials: true, origin: true }));
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/uploads", express.static("uploads", { maxAge: "31536000" }));
};
