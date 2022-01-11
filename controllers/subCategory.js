const SubCategory = require("../models/subCategory");
const Product = require("../models/product")
const slugify = require("slugify");

//create

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (error) {
    console.log("Sub Create Error ------>", error);
    req.status(400).send("Create subCategory failed");
  }
};

//List all
exports.list = async (req, res) =>
  res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());

// List one(read)
exports.read = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();

  let products = await Product.find({subs: subCategory})
.populate('category')
.exec()
res.json({
  subCategory,
  products
});
 // res.json(subCategory);
};

//Update

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent,slug: slugify(name) },
      { new: true }
    );
    console.log(JSON.stringify(updated));

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update unsuccessful");
  }
};

//Remove

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Delete unsuccessful");
  }
};
