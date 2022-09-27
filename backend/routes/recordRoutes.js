const express = require("express");
const router = express.Router();
const {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
  checkForAndUpdateOrAddRecord,
} = require("../controllers/recordController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addRecordToCollection)
  .put(protect, checkForAndUpdateOrAddRecord)
  .get(getRecordCollection);

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update album ${req.params.id}` });
// });
router.route("/:id").delete(protect, deleteRecordFromCollection);

// router.delete("/:id", deleteRecordFromCollection);

module.exports = router;
