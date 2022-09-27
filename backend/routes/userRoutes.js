const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(registerUser);

router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

router.get("/me", protect, getMe);
router.post("/login", loginUser);

module.exports = router;
