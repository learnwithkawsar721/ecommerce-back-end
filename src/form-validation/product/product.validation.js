const { check, validationResult } = require("express-validator");
exports.product_val = [
  check("name").notEmpty().withMessage("Product Name Is required"),
  check("price").notEmpty().withMessage("Product Price Is required"),
  check("discription")
    .notEmpty()
    .withMessage("Product discription Is required"),
  check("quantity").notEmpty().withMessage("Product quantity Is required"),
  check("category").notEmpty().withMessage("Product category Is required"),
];

exports.isproduct_val = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length > 0) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};
