const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    cartID: {
      type: Schema.Types.ObjectId,
      ref: "cart",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    date: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const order_model = model("order", orderSchema);

module.exports = order_model;
