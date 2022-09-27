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
      token: generateToken(user._id),
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

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc Get user data
//route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, userName, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    userName,
    email,
  });
});

//@desc update user
//route PUT /api/users:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { userName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { userName: userName, email: email, password: hashedPassword },
    {
      new: true,
    }
  );

  res.status(200).json(updatedUser);
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

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getMe,
  loginUser,
};
