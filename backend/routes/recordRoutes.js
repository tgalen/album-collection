const express = require("express");
const router = express.Router();
const {
  getRecordCollection,
  addRecordToCollection,
  checkForAndUpdateOrAddRecord,
  checkForAndUpdateOrDeleteRecordIfNoCollectedOrWishlistedUsers,
} = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  // .post(protect, addRecordToCollection)
  .put(protect, checkForAndUpdateOrAddRecord)
  .get(getRecordCollection);

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update album ${req.params.id}` });
// });
router
  .route("/:id")
  .put(protect, checkForAndUpdateOrDeleteRecordIfNoCollectedOrWishlistedUsers);

module.exports = router;
