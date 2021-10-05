// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateContentRequests = [
  check("request_by", "User_Id Request by is required.").notEmpty().trim(),
  check("description", "Description is required.").notEmpty().isString().trim(),
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
