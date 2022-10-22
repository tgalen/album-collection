const asyncHandler = require("express-async-handler");
const express = require("express");
const axios = require("axios");

const searchRecordsLastfm = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const SEARCH_ENDPOINT =
    "http://ws.audioscrobbler.com/2.0/?method=album.search&album=";
  const searchResults = await axios.get(
    `${SEARCH_ENDPOINT}${req.params.id}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json&limit=20`
  );
  // const resultsJson = await searchResults.json();
  res.status(200).json(searchResults.data);
  // res.status(200).json(resultsJson);
});

module.exports = {
  searchRecordsLastfm,
};
