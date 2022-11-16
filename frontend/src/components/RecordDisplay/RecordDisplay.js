import { useSelector, useDispatch } from "react-redux";
import {
  addRecordToCollection,
  removeUserFromRecord,
} from "../../features/records/recordSlice";

import "./RecordDisplay.css";

const RecordDisplay = ({
  record,
  recordsToDisplay,
  userWishlist,
  userCollection,
  setUserWishlist,
  setUserCollection,
}) => {
  const UPDATE_RECORD_API = `http://localhost:5000/api/records/${record._id}`;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updateWishlistBodyModel = {
    wishlistedUser: user._id,
    record: record._id,
  };

  const updateCollectionBodyModel = {
    collectedUser: user._id,
    record: record._id,
  };

  const handleAddRecordToCollection = (selectedRecord) => {
    const updatedWishlist = userWishlist.filter(
      (wishedRecord) => wishedRecord !== selectedRecord
    );
    const collectionToUpdate = [...userCollection];
    collectionToUpdate.push(selectedRecord);
    console.log(collectionToUpdate);
    setUserWishlist(updatedWishlist);
    setUserCollection(collectionToUpdate);
    dispatch(removeUserFromRecord(updateWishlistBodyModel));
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
