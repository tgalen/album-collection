const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
//@desc get users
//@route /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc add user
//@route /api/users
//@access Public
const addUser = asyncHandler(async (req, res) => {
  if (!req.body.userName && !req.body.email && !req.body.password) {
    res.status(400);
    throw new Error("Verify there is a user name, password, and email");
  }

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  });

  res.status(200).json(user);
});

//@desc update user
//route /api/users:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: "Update user" });
});

//@desc delete user
//route /api/users:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: "Delete user" });
});

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
