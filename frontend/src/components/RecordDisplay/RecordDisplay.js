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
  readOnly,
}) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const collectBodyModel = user && {
    artist: record.artist,
    name: record.name,
    collectedUsers: user._id,
  };

  const updateWishlistBodyModel = user && {
    wishlistedUsers: user._id,
    record: record._id,
  };

  const updateCollectionBodyModel = user && {
    collectedUsers: user._id,
    record: record._id,
  };

  const handleAddRecordToCollectionFromWishlist = (selectedRecord) => {
    const updatedWishlist = userWishlist.filter(
      (wishedRecord) => wishedRecord !== selectedRecord
    );
    const collectionToUpdate = [...userCollection];
    collectionToUpdate.push(selectedRecord);
    console.log(collectionToUpdate);
    setUserWishlist(updatedWishlist);
    setUserCollection(collectionToUpdate);
    dispatch(removeUserFromRecord(updateWishlistBodyModel));
    dispatch(addRecordToCollection(collectBodyModel));
  };

  const handleDeleteRecord = (list, selectedRecord) => {
    if (list === "Wishlist") {
      const updatedWishlist = userWishlist.filter(
        (wishedRecord) => wishedRecord !== selectedRecord
      );
      setUserWishlist(updatedWishlist);
      dispatch(removeUserFromRecord(updateWishlistBodyModel));
    } else {
      const updatedCollection = userCollection.filter(
        (collectedRecord) => collectedRecord !== selectedRecord
      );
      setUserCollection(updatedCollection);
      dispatch(removeUserFromRecord(updateCollectionBodyModel));
    }
  };

  return (
    <div className="record-display-container">
      <img src={record.images.large} />
      <div className="record-title-container">
        <p className="artist-name">{record.artist}</p>
        <p className="record-name">{record.name}</p>
      </div>
      {!readOnly && (
        <div className="record-ui-container">
          {recordsToDisplay === "Wishlist" && (
            <button
              onClick={() => handleAddRecordToCollectionFromWishlist(record)}
            >
              {" "}
              + Collect
            </button>
          )}
          <button onClick={() => handleDeleteRecord(recordsToDisplay, record)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordDisplay;
