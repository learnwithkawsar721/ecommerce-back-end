const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  addCategory,
} = require("../../../controllers/admin/Category/category.controller");
const {
  category_val,
  iscategory_val,
} = require("../../../form-validation/category/category.validation");
const { adminMiddleWare, verifyToken } = require("../../../middleware/common-middleware");

// get all Category route
router.get("/",verifyToken, adminMiddleWare, getAllCategory);

// post Category Route
router.post("/create",verifyToken,adminMiddleWare, category_val, iscategory_val, addCategory);

module.exports = router;
