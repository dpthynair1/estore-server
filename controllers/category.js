const Category = require('../models/category')
const Product = require('../models/product')
const SubCategory = require('../models/subCategory')
const slugify = require("slugify");


// create category
exports.create = async (req, res) => {
    try {
      const { name } = req.body;
      // const category = await new Category({ name, slug: slugify(name) }).save();
      // res.json(category);
      res.json(await new Category({ name, slug: slugify(name) }).save());
    } catch (err) {
      // console.log(err);
      res.status(400).send("Create category failed");
    }
  };

//List all categories
exports.list = async(req,res) => res.json(await Category.find({}).sort({createdAt: -1}).exec())

//Read
exports.read = async(req,res) => {
let category = await Category.findOne({ slug : req.params.slug}).exec()
//res.json(category);
let products = await Product.find({category})
.populate('category')
.populate("ratings.postedBy", "_id name")
.exec()
res.json({
  category,
  products
});
};

//Update
exports.update = async(req,res) => {
    const {name} = req.body
    try {
        const updated = await Category.findOneAndUpdate({slug: req.params.slug},{name, slug: slugify(name)}, {new: true})
        res.json(updated)
    } catch (error) {
        res.status(400).send("update unsuccessful")
    }

};

// Remove
exports.remove = async(req,res) => {
    try {
        const deleted = await Category.findOneAndDelete({slug: req.params.slug})
        res.json(deleted);
    } catch (error) {
        res.status(400).send("Delete unsuccessful")
    }

};

//Get all subs

exports.getSubs = (req, res) => {
    SubCategory.find({ parent: req.params._id }).exec((err, subs) => {
      if (err) console.log(err.message);
      res.json(subs);
    });
  };