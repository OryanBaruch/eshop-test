const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
  },
  { versionKey: false }
);

const product_model = model(`product`, productSchema);

const initProducts=async()=>{
    const computer = new product_model({
        title: `Computer`,
        price: `1000`,
        description: `One of the most hardcore gameing computers.`,
        image:`data:image/jpeg;base64,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`
      });
      await computer.save();

    const screen = new product_model({
        title: `Screen`,
        price: `1000`,
        description: `A screen of 27 inches.`,
        image:'https://store.hp.com/app/assets/images/uploads/prod/top-3-ways-computer-screen-repair-hero1551994969454.png'
      });
      await screen.save();
}

module.exports={initProducts, product_model}