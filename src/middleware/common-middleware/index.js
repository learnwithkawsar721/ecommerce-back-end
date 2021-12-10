const jwt = require("jsonwebtoken");
// verify token
exports.verifyToken = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ");
    if (token[0] === "Bearer") {
      const user = jwt.verify(token[1], process.env.JWT_TOKEN);
      req.user = user;
    } else {
      res.status(400).json({ error: "Invalid Token" });
    }
  } else {
    res.status(400).json({ error: "User Not Authenticated" });
  }

  next();
};

// userMiddleWare
exports.userMiddleWare = (req, res, next) => {
  // res.json(req.user);
  if (req.user.role !== "user") {
    return res.status(400).json({ error: "User Access denied" });
  }
  next();
};
// AdminMiddleWare
exports.adminMiddleWare = (req, res, next) => {
  // res.json(req.user);
  if (req.user.role !== "admin") {
    return res.status(400).json({ error: "Admin Access denied" });
  }
  next();
};
