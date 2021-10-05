// Init
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

exports.validateGames = [
  check("game_name", "Game Name is required.").notEmpty().trim(),
  check("category", "Category is required.").notEmpty().trim(),
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
