const express = require("express");
const router = express.Router();
const {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
  checkForAndUpdateOrAddRecord,
} = require("../controllers/recordController");

router
  .route("/")
  .get(getRecordCollection)
  .post(addRecordToCollection)
  .put(checkForAndUpdateOrAddRecord);

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update album ${req.params.id}` });
// });
router.route("/:id").delete(deleteRecordFromCollection);

// router.delete("/:id", deleteRecordFromCollection);

module.exports = router;
