const express = require("express");
const { addToCart } = require("../../controllers/Cart/cart.controller");
const {
  verifyToken,
  userMiddleWare,
} = require("../../middleware/common-middleware");
const router = express.Router();

// add To Cart
router.post("/add", verifyToken, userMiddleWare, addToCart);

module.exports = router;
