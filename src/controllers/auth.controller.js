const User = require("../models/auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((_, user) => {
    if (user) {
      return res.status(400).json({
        error: "User already registered",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;

      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString(),
      });
      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            error: "Something went Wrong",
          });
        }
        if (data) {
          return res.status(201).json({
            message: "User Inserted Succesfully!!!",
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json(error);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.hash_password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: 60 * 60,
        });

        res.json({ token, user });
      }
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  });
};
