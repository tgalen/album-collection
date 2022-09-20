const express = require("express");
const router = express.Router();
const {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
} = require("../controllers/collectionController");

router.route("/").get(getRecordCollection).post(addRecordToCollection);

// router.put("/:id", (req, res) => {
//   res.status(200).json({ message: `Update album ${req.params.id}` });
// });

router.delete("/:id", deleteRecordFromCollection);

module.exports = router;
