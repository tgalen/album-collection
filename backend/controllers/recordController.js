const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Record = require("../models/recordModel");
const { findOne, findOneAndUpdate } = require("../models/recordModel");
const { faSave } = require("@fortawesome/free-solid-svg-icons");

//description: GET record collection
//@ route GET /api/records
// https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
const getRecordCollection = asyncHandler(async (req, res) => {
  const records = await Record.find();

  res.status(200).json(records);
});

const checkForAndUpdateOrAddRecord = asyncHandler(async (req, res) => {
  // const existingRecord = await Record.find({ name: req.body.name, spotify_id : req.body.spotify_id });
  const query = { name: req.body.name, spotify_id: req.body.spotify_id };
  const newRecord = {
    album_type: req.body.album_type,
    artist: req.body.artists,
    spotify_url: req.body.spotify_url,
    href: req.body.href,
    spotify_id: req.body.spotify_id,
    images: req.body.images,
    name: req.body.name,
    release_date: req.body.release_date,
    total_tracks: req.body.total_tracks,
    type: req.body.type,
    uri: req.body.uri,
    // collectedUsers: req.body.collectedUsers,
    wishlistedUsers: req.body.wishlistedUsers,
  };
  const updatedOrNewRecord = await Record.updateOne(
    query,
    {
      $push: { collectedUsers: req.body.collectedUsers },
      $setOnInsert: newRecord,
    },
    { upsert: true }
  );

  // const recordToUpdate = await Record.findOneAndUpdate(
  //   { name: req.body.name },
  //   { $push: { collectedUsers: req.body.collectedUsers } },
  //   {
  //     upsert: true,
  //     new: true,
  //   }
  // );

  res.status(201).json(updatedOrNewRecord);
});

// description: PUT record to records collection or create if it does not exist
//@route PUT /api/records
const addRecordToCollection = asyncHandler(async (req, res) => {
  if (!req.body.album_type && !req.body.spotify_id && req.body.name) {
    res.status(400);
    throw new Error("Please verify album_type, id, name fields.");
  }

  const record = await Record.create({
    album_type: req.body.album_type,
    spotify_id: req.body.spotify_id,
    name: req.body.name,
    href: req.body.href,
    release_date: req.body.release_date,
    total_tracks: req.body.total_tracks,
    type: req.body.type,
    uri: req.body.uri,
    artists: req.body.artists,
    images: req.body.images,
    collectedUsers: req.body.collectedUser, // test
  });
  res.status(200).json(record);

  // const reqArtistsList = req.body.artists.map((artist) => {
  //   return artist;
  // });
  // const reqImagesList = req.body.images.map((image) => {
  //   return image;
  // });
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
  checkForAndUpdateOrAddRecord,
};
