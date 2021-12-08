const { check, validationResult } = require("express-validator");
exports.category_val = [
  check("name").notEmpty().withMessage("Category Name Is required"),
];

exports.iscategory_val = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length > 0) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};
