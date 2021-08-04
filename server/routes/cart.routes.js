const router = require("express").Router();
const cartItem_model = require("../models/cartItem.model");
const cart_model = require("../models/cart.model");

router.post("/make-cart", async (req, res) => {
  try {
    const { userID } = req.body;
    const cart = await cart_model.find({ userID }).populate({
      path: "product",
    });
    if (cart.length) {
      return res.json({ err: false, msg: "Existed Cart ", cart: cart[0] });
    }
    const new_cart = await cart_model.create({
      userID,
    });
    res.json({ err: false, msg: "new cart has been made", cart: new_cart });
  } catch (error) {
    console.log({ error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { product, cartID, amount } = req.body;
    let sum = 0;
    const ifExist = await cartItem_model.findOne({ product, cartID });
    if (ifExist) {
      await cartItem_model.updateOne(
        { product, cartID },
        { amount: Number(ifExist.amount) + Number(amount) }
      );
      const all_products_in_cart = await cartItem_model
        .find({ cartID })
        .populate({
          path: "product",
        });
      for (let i = 0; i < all_products_in_cart.length; i++) {
        sum +=
          all_products_in_cart[i].product.price *
          all_products_in_cart[i].amount;
      }
      return res.json({ all_products_in_cart, sum });
    }

    await cartItem_model.create({
      product,
      cartID,
      amount,
    });
    const all_products_in_cart = await cartItem_model
    .find({ cartID })
    .populate({
      path: "product",
    });
    
    for (let i = 0; i < all_products_in_cart.length; i++) {
      console.log(all_products_in_cart[i].product.price)
      sum +=
        all_products_in_cart[i].product.price * all_products_in_cart[i].amount;
    }
    return res.json({ all_products_in_cart, sum });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/clear-cart/:cartID", async (req, res) => {
  try {
    const { cartID } = req.params;
    const clearedCart = await cartItem_model.deleteMany({ cartID });
    res.json({
      err: false,
      msg: "Cleared card for you Sir",
      clearedCart,
    });
  } catch (error) {
    console.log({
      err: true,
      msg: "Error with delete all cart.",
      error: error,
    });
  }
});

module.exports = router;
