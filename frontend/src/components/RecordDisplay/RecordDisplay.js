import "./RecordDisplay.css";

const RecordDisplay = ({
  record,
  recordsToDisplay,
  userWishlist,
  userCollection,
  setUserWishlist,
  setUserCollection,
}) => {
  const handleAddRecordToCollection = (selectedRecord) => {
    const updatedWishlist = userWishlist.filter(
      (wishedRecord) => wishedRecord !== selectedRecord
    );
    const collectionToUpdate = [...userCollection];
    collectionToUpdate.push(selectedRecord);
    console.log(collectionToUpdate);
    setUserWishlist(updatedWishlist);
    setUserCollection(collectionToUpdate);
  };

  return (
    <div className="record-display-container">
      <img src={record.images.large} />
      <div className="record-title-container">
        <p className="artist-name">{record.artist}</p>
        <p className="record-name">{record.name}</p>
      </div>
      <div className="record-ui-container">
        {recordsToDisplay === "Wishlist" && (
          <button onClick={() => handleAddRecordToCollection(record)}>
            {" "}
            + Collect
          </button>
        )}
        <button>Delete</button>
      </div>
    </div>
  );
};

export default RecordDisplay;
