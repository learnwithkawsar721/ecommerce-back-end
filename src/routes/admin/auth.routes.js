const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controllers/admin/auth.controller");
const {
  isSignIn_val,
  signIn_val,
  signUp_Val,
  isSignUp_val,
} = require("../../form-validation/auth.validation");
const { verifyToken } = require("../../middleware/common-middleware");
router.post("/signin", signIn_val, isSignIn_val, signin);
router.post("/signup", signUp_Val, isSignUp_val, signup);
router.post("/profile", verifyToken, (req, res) => {
  res.json("User Profile");
});
module.exports = router;
