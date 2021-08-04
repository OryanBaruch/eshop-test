const { product_model } = require("../models/product.model");

const router = require("express").Router();

router.get("/all-products", async (req, res) => {
  try {
    const fetchProducts = await product_model.find();
    return res.json({
      err: false,
      msg: "All products of the shop.",
      fetchProducts,
    });
  } catch (error) {
    console.log(`The error with fetch all products is ${error}`);
  }
});
router.post(`/add-products`, async (req, res) => {
  try {
    const { title, price, description, image } = req.body;
    const addProduct = await product_model.create({
      title,
      price,
      description,
      image,
    });
    return res.json({
      err: false,
      msg: "New product added to shop",
      addProduct,
    });
  } catch (error) {
    console.log(`The error with add products is ${error}`);
  }
});

router.put("/edit/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, price, description, image } = req.body;
    await product_model.findOneAndUpdate(
      { _id },
      {
        title,
        price,
        description,
        image,
      }
    );
    const fetchProducts = await product_model.find();
    return res
      .status(201)
      .json({ err: false, msg: "Product edited", fetchProducts });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
