// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateVideos = [
  check("title", "Title is required.").notEmpty().trim(),
  check("src_url", "src_url is required.").notEmpty().trim(),
  check("creator", "Creator Field is not correct.").notEmpty().trim(),
  check("views", "Views field is not correct.").isNumeric(),
  check("status", "Status is not correct.").isIn([
    "Publish",
    "Process",
    "Private",
    "Restricted",
    "Edited",
    "Review",
  ]),
  check("thumbnail", "Thumbnail is wrong.").trim(),
  check("course", "Number is required.").trim(),
];

/*
======================
Result
======================
*/
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    next();
  }
};
