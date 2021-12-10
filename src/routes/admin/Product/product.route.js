const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  adminMiddleWare,
  verifyToken,
} = require("../../../middleware/common-middleware");
const {
  createProduct,
} = require("../../../controllers/admin/Product/product.controller");
const path = require("path");
const shortId = require("shortid");
const {
  product_val,
  isproduct_val,
} = require("../../../form-validation/product/product.validation");

// upload Image
const FileDir = path.join(path.dirname(__dirname), "./../../uploads/product/");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FileDir);
  },
  filename: function (req, file, cb) {
    const fileName = shortId.generate() + "-" + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
// get all Category route
router.get("/", verifyToken, adminMiddleWare, (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

// post Category Route
// router.post(
//   "/create",
//   verifyToken,
//   adminMiddleWare,
// product_val,
// isproduct_val,
//   upload.array("productPictures"),
//   createProduct,
// );

router.post("/create", verifyToken, adminMiddleWare,upload.array("productPictures"),product_val,isproduct_val ,createProduct);

module.exports = router;
