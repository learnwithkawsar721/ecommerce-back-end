const category = require("../../../models/Category/category");
const slugify = require("slugify");
// getAll Category Controller
exports.getAllCategory = (req, res) => {
  category.find({}).exec((error, catData) => {
    if (error) return res.status(400).json({ error });
    if (catData) return res.status(200).json({ category:catData });
  });

};
// Post Category Controller
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name.toLowerCase() + "-" + Math.random(10), "-"),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const _Category = new category(categoryObj);
  category.findOne({ name: req.body.name }).exec((_, data) => {
    if (data) return res.status(400).json({ error: "already exists" });
    _Category.save((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) return res.status(200).json({ category });
    });
  });
};
