import { useSelector, useDispatch } from "react-redux";
import { addRecordToCollection } from "../../features/records/recordSlice";
import "./SearchedAlbum.css";

const SearchedAlbum = ({ info, images }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const collectBodyModel = {
    artist: info.artist,
    images: images,
    name: info.name,
    url: info.url,
    collectedUsers: user._id,
  };

  const wishlistBodyModel = {
    artist: info.artist,
    images: images,
    name: info.name,
    url: info.url,
    wishlistedUsers: user._id,
  };

  const handleAddRecordToCollection = () => {
    dispatch(addRecordToCollection(collectBodyModel));
  };

  const handleAddRecordToWishlist = () => {
    dispatch(addRecordToCollection(wishlistBodyModel));
  };

  return (
    <div className="searched-record-container">
      <img src={images.large} />
      <div className="searched-record-title-container">
        <p className="artist-name">{info.artist}</p>
        <p className="record-name">{info.name}</p>
      </div>
      <div className="searched-record-ui-container">
        <button
          onClick={() => handleAddRecordToCollection(collectBodyModel)}
          className="collect-btn"
        >
          {" "}
          + Collect
        </button>

        <button
          onClick={() => handleAddRecordToWishlist(wishlistBodyModel)}
          className="wishlist-btn"
        >
          + Wishlist
        </button>
      </div>
    </div>
  );
};

export default SearchedAlbum;
