import "./RecordDisplay.css";

const RecordDisplay = ({
  record,
  recordsToDisplay,
  userWishlist,
  userCollection,
}) => {
  return (
    <div className="record-display-container">
      <img src={record.images.large} />
      <div className="record-title-container">
        <p>{record.name}</p>
      </div>
      <div className="record-ui-container">
        {recordsToDisplay === "Wishlist" && <button> + Collect</button>}
        <button>Delete</button>
      </div>
    </div>
  );
};

export default RecordDisplay;
