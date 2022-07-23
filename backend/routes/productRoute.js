const express = require("express");

const router = express.Router();

const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

router.route("/products").get(getAllProduct);
router.route("/product/new").post(createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);
module.exports = router;
