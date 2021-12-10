const Product = require("../../../models/Product/product.modle");
const slugify = require("slugify");
// create product

exports.createProduct = (req, res) => {
//   res.status(200).json({ file: req.files, body: req.body });
  // productPictures
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const { name, price, discription, offer, category, quantity } = req.body;
  const _product = new Product({
    name,
    slug: slugify(name, "-"),
    price,
    discription,
    offer,
    category,
    productPictures,
    quantity,
    createdBy: req.user._id,
  });
  _product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(200).json({ product });
  });

  //   res.status(200).json({ message: "product page" });
};
