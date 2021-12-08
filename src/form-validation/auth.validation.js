const { check, validationResult } = require("express-validator");
exports.signIn_val = [
  check("firstName").notEmpty().withMessage("First Name Is required"),
  check("lastName").notEmpty().withMessage("Last Name Is required"),
  check("email").notEmpty().withMessage("Email Is required"),
  check("email").isEmail().withMessage("Email Not Validate"),
  check("password").notEmpty().withMessage("password is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at last 6 character long"),
];

exports.isSignIn_val = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length > 0) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};

exports.signUp_Val = [
  check("email").notEmpty().withMessage("Email Is required"),
  check("email").isEmail().withMessage("Email Not Validate"),
  check("password").notEmpty().withMessage("password is required"),
];

exports.isSignUp_val = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length > 0) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};
