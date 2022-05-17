const asyncHandler = require("express-async-handler");

const CollectedRecord = require("../models/collectedRecordModel");

//description: GET record collection
//@ route GET /api/vinylcollection
const getRecordCollection = asyncHandler(async (req, res) => {
  const records = await CollectedRecord.find();

  res.status(200).json(records);
});

// description: POST record to collection library
//@route POST /api/vinylcollection
const addRecordToCollection = asyncHandler(async (req, res) => {
  if (!req.body.album_type && !req.body.spotify_id && req.body.name) {
    res.status(400);

    throw new Error("Please verify album_type, id, name fields.");
  }

  const record = await CollectedRecord.create({
    album_type: req.body.album_type,
    spotify_id: req.body.spotify_id,
    name: req.body.name,
  });

  res.status(200).json(record);
});

//decription: DELETE record from collection
//@route DELETE /api/vinylcollection/:id
const deleteRecordFromCollection = asyncHandler(async (req, res) => {
  const record = await CollectedRecord.findById(req.params.id);
  res.set("Access-Control-Allow-Origin", "*");
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  }
  res.status(200).json({ message: `Delete album ${req.params.id}` });
});

module.exports = {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
};
