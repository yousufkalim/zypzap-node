// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateRatings = [
  check("rating", "Rating is required.").notEmpty().trim(),
  check("comment", "Comment should not empty.").trim(),
  check("course", "course is required.").notEmpty().trim(),
  check("rating_by", "User_Id is required.").notEmpty().trim(),
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
