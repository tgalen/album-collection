const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "Please add a user name."],
    },
    email: {
      type: String,
      required: [true, "Please add an email."],
    },
    password: { type: String, required: [true, "Please add a password."] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
