const express = require("express");
const router = express.Router();
const { searchRecordsLastfm } = require("../controllers/searchController");

router.route("/:id").get(searchRecordsLastfm);

module.exports = router;
