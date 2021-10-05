// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateCourses = [
  check("course_name", "Course name is required.").notEmpty().trim(),
  check("creator", "creator id is required.").notEmpty().trim(),
  check("price", "Gender is required.").isInt(),
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
