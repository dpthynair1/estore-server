const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middleware/auth')

// controller
const {
  create, listAll,remove,read, update, list, productsCount, productStar,listRelated,searchFilters
  
} = require('../controllers/product')

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

// Ratings
router.put("/product/star/:productId", authCheck, productStar);

//Related products
router.get("/product/related/:productId", listRelated);

//Home Page
router.post("/products", list);

//Search

router.post("/search/filters", searchFilters);

module.exports = router;
