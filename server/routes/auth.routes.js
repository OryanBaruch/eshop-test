const { user_model } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cart_model = require("../models/cart.model");
require("dotenv").config;

const router = require("express").Router();

router.get("/fetch-users", async (req, res) => {
  try {
    const fetchUsers = await user_model.find();
    return res.json({ fetchUsers });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const check_user = await user_model.findOne({ username }).lean();
    const match = await bcrypt.compare(password, check_user.password);
    console.log(match)
    if (!match)
      return res.status(418).json({ err: true, msg: "Password invalid" });
    if (!check_user)
      return res
        .status(503)
        .json({ err: true, msg: "Invlaid username/password." });
    const access_token = jwt.sign(
      {
        id:check_user._id,
        username:check_user.username,
        role:check_user.role
      },
      `${process.env.ACCESS_TOKEN}`
    );
    return res.json({
      err: false,
      msg: `Welcome ${check_user.username}`,
      access_token,
    });
  } catch (error) {
    console.log(`The error with login is: ${error}`);
  }
});





// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const invalidMessage = "Invalid email/password";

//     const user = await user_model.find({username}).lean();
//     console.log({user})
//     if (!user)
//       return res.status(500).json({ status: "Erorr", error: invalidMessage });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match)
//       return res.status(500).json({ status: "Erorr", error: invalidMessage });

//     const access_token = jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//       },
//       `${process.env.ACCESS_TOKEN}`
//     );
//     return res.status(200).json({ status: "ok", access_token: access_token });
//   } catch (error) {
//     console.log({ error });
//   }
// });




router.post("/register", async (req, res) => {
  const {
    username,
    password: plainTextPassword,
  } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const registerNewUser= await user_model.create({
      username,
      password,
    });
    res.json({
      err: false,
      msg: `Successfully registered ${username}`,
      registerNewUser,
    });
  } catch (error) {
    if (error.code == 11000)
      return res.status(418).json({
        status: "Error",
        error: "Username alreaday in use.",
      });
    console.log({ error });
  }
});

module.exports = router;
