const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema(
  {
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      cartID: {
        type: Schema.Types.ObjectId,
        ref: "cart",
      },
      amount: Number,
      totalSum: Number,
  },
  { versionKey: false }
);

const cartItem_model = model("cartItem", CartItemSchema);

module.exports = cartItem_model;
