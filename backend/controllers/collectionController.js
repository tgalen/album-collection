//description: GET record collection
//@ route GET /api/vinylcollection
const getRecordCollection = (req, res) => {
  res.status(200).json({ message: "get albums" });
};

// description: POST record to collection library
//@route POST /api/vinylcollection
const addRecordToCollection = (req, res) => {
  res.status(200).json({ message: "Add album" });
};

//decription: DELETE record from collection
//@route DELETE /api/vinylcollection/:id
const deleteRecordFromCollection = (req, res) => {
  res.status(200).json({ message: `Delete album ${req.params.id}` });
};

module.exports = {
  getRecordCollection,
  addRecordToCollection,
  deleteRecordFromCollection,
};
