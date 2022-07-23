const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
//create product--->  admin
exports.createProduct = catchAsyncErrors(async function (req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

// get all products
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search();
  const Products = await apiFeatures.query;

  return res.status(201).send({ success: true, Products });
});

// update product ==> admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: true,
  });

  return res.status(200).json({ success: true, product: product });
});

// delete product from

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({ error: "Product not found", success: false });
  }
  await product.remove();

  return res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

// get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({ error: "Product not found", success: false });
  }
  return res.status(200).json({ success: true, product });
});
