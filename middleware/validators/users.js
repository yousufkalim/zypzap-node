// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateUsers = [
  check("username", "Username is required.").notEmpty().trim(),
  check("role", "role is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("role", "Role is required.").notEmpty(),
  check(
    "subscription",
    "Subscription should be Free, Platform Based or Per Course."
  ),
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
