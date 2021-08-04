const router = require("express").Router();
const cartItem_model = require("../models/cartItem.model");
const cart_model = require("../models/cart.model");
const order_model = require("../models/order.model");

//post a  new order
router.post("/order/:cartID", async (req, res) => {
  try {
    const { cartID } = req.params;
    const { userID } = req.body;

    await cart_model.findOneAndUpdate(
      { _id: cartID },
      { $set: { active: false } }
    );
    const newOrder = await order_model.create({
      userID,
    });

    let cartDetails = await cartItem_model.find({ cartID: cartID }).populate({
      path: "product",
    });

    let totalSum = cartDetails[0].product.price * cartDetails[0].amount;

    return res.status(201).json({
      err: false,
      msg: "Youre order has been sent.",
      newOrder,
      cartDetails,
      totalSum,
    });
  } catch (error) {
    console.log(`The error with order is : ${error}`);
  }
});

router.get(`/all-orders`, async (req, res) => {
  try {
    //make an array and find cartDetails.
    let orderedItems = [];
    let sortable = [];
    let cartDetails = await cartItem_model.find({}).populate({
      path: "product",
    });
    //loop through out the cartDetails to extract the title of the product.
    for (let i = 0; i < cartDetails.length; i++) {
      orderedItems.push(cartDetails[i].product.title);
    }

    //return an object with the number of orders for each item
    let statsOfOrders = orderedItems.sort().reduce((obj, b) => {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});

    //push in to a more comfortable for the eye array.
    for (let element in statsOfOrders) {
      sortable.push([element, statsOfOrders[element]]);
    }

    //sort from top to bottom
    let sorted = sortable.sort((a, b) => {
      return b[1] - a[1];
    });

    let top5Products = [sorted[0], sorted[1], sorted[2], sorted[3], sorted[4]];

    return res.json({
      err: false,
      msg: "All orders has been fetched.",
      sorted: top5Products,
    });
  } catch (error) {
    console.log(`The error with all-orders is ${error}`);
  }
});

//get the sum of orders from date
router.get("/sumByDate", async (req, res) => {
  try {
    let objOfDataAndSumOfSale = {};
    let cartDetails = await cartItem_model.find().populate({
      path: "product",
    });

    let totalSum = cartDetails[0].product.price * cartDetails[0].amount;
    objOfDataAndSumOfSale.sum = totalSum;

    let fiveDaysOfDate=new Date()
    console.log(fiveDaysOfDate)
    const fetchDatesOfOrders = await order_model.find({});

    return res.json({fetchDatesOfOrders, totalSum});
  } catch (error) {
    console.log(`Error with sum by date is ${error}`);
  }
});

module.exports = router;
