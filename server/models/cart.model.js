const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    productID: { type: Schema.Types.ObjectId, ref: "product" },
  },
  { versionKey: false }
);

const cart_model = model("cart", CartSchema);

module.exports = cart_model;
