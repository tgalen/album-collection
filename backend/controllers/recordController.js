const asyncHandler = require("express-async-handler");

const Record = require("../models/recordModel");

//description: GET record collection
//@ route GET /api/vinylcollection
// https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
const getRecordCollection = asyncHandler(async (req, res) => {
  const records = await Record.find();

  res.status(200).json(records);
});

// description: POST record to collection library
//@route POST /api/vinylcollection
const addRecordToCollection = asyncHandler(async (req, res) => {
  if (!req.body.album_type && !req.body.spotify_id && req.body.name) {
    res.status(400);

    throw new Error("Please verify album_type, id, name fields.");
  }

  const reqArtistsList = req.body.artists.map((artist) => {
    return artist;
  });

  const reqImagesList = req.body.images.map((image) => {
    return image;
  });

  const record = await Record.create({
    album_type: req.body.album_type,
    spotify_id: req.body.spotify_id,
    name: req.body.name,
    href: req.body.href,
    release_date: req.body.release_date,
    total_tracks: req.body.total_tracks,
    type: req.body.type,
    uri: req.body.uri,
    artists: reqArtistsList,
    images: reqImagesList,
  });

  res.status(200).json(record);
});

//decription: DELETE record from collection
//@route DELETE /api/vinylcollection/:id
const deleteRecordFromCollection = asyncHandler(async (req, res) => {
  const record = await Record.findById(req.params.id);
  res.set("Access-Control-Allow-Origin", "*");
  if (!record) {
    res.status(400);
    throw new Error("Record not found");
  }

  await record.remove();

  res.status(200).json({ message: `Delete album ${req.params.id}` });
});

module.exports = {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
};
