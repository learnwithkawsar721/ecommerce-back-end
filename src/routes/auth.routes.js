const express = require("express");
const {
  signup,
  signin,
  verifyToken,
} = require("../controllers/auth.controller");
const {
  signUp_Val,
  isSignUp_val,
  isSignIn_val,
  signIn_val,
} = require("../form-validation/auth.validation");

const router = express.Router();

router.post("/signin", signIn_val, isSignIn_val, signin);
router.post("/signup", signUp_Val, isSignUp_val, signup);
router.post("/profile", verifyToken, (req, res) => {
  res.json("User Profile");
});
module.exports = router;
