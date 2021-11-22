// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateCreators = [check("user_id", "User Id is required.").trim()];

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
