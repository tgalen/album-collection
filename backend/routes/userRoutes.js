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

router.route("/").get(getUsers).post(registerUser);

router.route("/:id").put(updateUser).delete(deleteUser);

router.get("/me", getMe);
router.post("/login", loginUser);

module.exports = router;
