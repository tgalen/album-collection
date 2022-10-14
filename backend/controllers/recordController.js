const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();

const Record = require("../models/recordModel");
const User = require("../models/userModel");
const { findOne, findOneAndUpdate } = require("../models/recordModel");
const { faSave } = require("@fortawesome/free-solid-svg-icons");

//description: GET record collection
//@ route GET /api/records
// https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
const getRecordCollection = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.find({ userName: req.body.userName });
  console.log(user);
  const { _id, userName } = user[0];
  console.log(_id);
  // console.log(userName);
  const records = await Record.find({ collectedUsers: _id }); // need to reference collectedUser

  res.status(200).json(records);
});

//description: GET record collection by :id (userName)
//@route GET /api/records/collectedrecords/:id
const getUserCollectedRecords = asyncHandler(async (req, res) => {
  console.log(req.params);
  const user = await User.find({ userName: req.params.id });
  const { _id } = user[0];
  console.log(_id);
  const collectedRecords = await Record.find({ collectedUsers: _id });
  res.status(200).json(collectedRecords);
});

//description: GET wishlist records by :id (userName)
//@route GET /api/records/wishlistededrecords/:id
const getUserWishlistedRecords = asyncHandler(async (req, res) => {
  console.log(req.params);
  const user = await User.find({ userName: req.params.id });
  const { _id } = user[0];
  console.log(_id);
  const wishlistedRecords = await Record.find({ wishlistedUsers: _id });
  res.status(200).json(wishlistedRecords);
});

//description: update record or create record if it does not exist
//@ route PUT /api/records
const checkForAndUpdateOrAddRecord = asyncHandler(async (req, res) => {
  const query = { name: req.body.name, artist: req.body.artist };

  const newRecord = {
    artist: req.body.artist,
    images: req.body.images,
    name: req.body.name,
    url: req.body.url,
  };

  const updateParameters = req.body.collectedUsers // check if PUT is for collected or wishlisted user
    ? { collectedUsers: req.user.id }
    : { wishlistedUsers: req.user.id };
  const updatedOrNewRecord = await Record.updateOne(
    query,
    {
      $push: { ...updateParameters },
      $setOnInsert: newRecord,
    },
    { upsert: true }
  );

  if (updatedOrNewRecord.upsertedCount === 1) {
    res.status(201).json(updatedOrNewRecord);
  }

  if (updatedOrNewRecord.modifiedCount === 1) {
    res.status(200).json(updatedOrNewRecord);
  }
});

//description: update record or delete record if collectedUsers and WishlistedUsers do not exist
//@ route PUT /api/records/:id
const checkForAndUpdateOrDeleteRecord = asyncHandler(async (req, res) => {
  console.log("checkforAndUpdateOrDeleteRecord");
  console.log(req.user.id);

  const updateParameters = req.body.collectedUsers // check if PUT is for collected or wishlisted user
    ? { collectedUsers: req.user.id }
    : { wishlistedUsers: req.user.id };
  console.log(updateParameters);

  console.log(req.params.id);

  const updatedRecord = await Record.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { ...updateParameters } },
    { new: true }
  );

  console.log(updatedRecord);
  if (!updatedRecord) {
    res.status(400).json({ message: "Record not found" });
  } else if (
    updatedRecord.collectedUsers.length === 0 &&
    updatedRecord.wishlistedUsers.length === 0
  ) {
    await updatedRecord.remove();
    res
      .status(200)
      .json({ message: "User removed from Record and Record deleted" });
  } else {
    res.status(200).json({ message: "User deleted from record" });
  }
});

module.exports = {
  getRecordCollection,
  checkForAndUpdateOrAddRecord,
  checkForAndUpdateOrDeleteRecord,
  getUserCollectedRecords,
  getUserWishlistedRecords,
};
