const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const user_model = model(`user`, userSchema);

const initUsers = async () => {
  const user1 = new user_model({
    username: `admin`,
    password: `123`,
    role: 1,
  });
  await user1.save();
};

module.exports = { user_model, initUsers };
