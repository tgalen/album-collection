const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

//@desc get users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@desc register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("Verify there is a user name, password, and email");
  }

  // check if
  const userNameExists = await User.findOne({ userName });

  if (userNameExists) {
    res.status(400);
    throw new Error("Username unavailable.");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("Email already has an account.");
  }

  // Hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    userName: userName,
    password: hashedPassword,
    email: email,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc login user
//route POST /api/users
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
});

//@desc Get user data
//route GET /api/users/me
//@access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Display user data" });
});

//@desc update user
//route PUT /api/users:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ messgae: "Update user" });
});

//@desc delete user
//route DELETE /api/users:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const userToDelete = await User.findById(req.params.id);
  res.set("Access-Control-Allow-Origin", "*");
  if (!userToDelete) {
    res.status(400);
    throw new Error("User not found.");
  }

  await userToDelete.remove();

  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getMe,
  loginUser,
};
