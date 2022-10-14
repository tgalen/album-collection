import { useSelector, useDispatch } from "react-redux";
import { addRecordToCollection } from "../../features/records/recordSlice";

const albumCardStyle = {
  height: "400px",
  width: "310px",
  display: "inline-block",
  margin: "3%",
  boxSizing: "border-box",
};

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
    <div style={albumCardStyle}>
      <h3>{info.name}</h3>
      <h5>Artist: {info.artist}</h5>
      <button onClick={() => handleAddRecordToCollection()}>Collect</button>
      <button onClick={() => handleAddRecordToWishlist()}>Wishlist</button>
      <img alt={info.name} src={images.extraLarge} />
    </div>
  );
};

export default SearchedAlbum;
