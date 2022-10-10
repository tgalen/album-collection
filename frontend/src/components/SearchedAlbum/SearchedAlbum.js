import { useSelector } from "react-redux";

const albumCardStyle = {
  height: "400px",
  width: "310px",
  display: "inline-block",
  margin: "3%",
  boxSizing: "border-box",
};

const SearchedAlbum = ({ info, images }) => {
  const { user } = useSelector((state) => state.auth);

  const postBodyModel = {
    artist: info.artist,
    images: images,
    name: info.name,
    url: info.url,
    collectedUsers: user._id,
  };

  const postOptions = {
    method: "PUT",
    body: JSON.stringify(postBodyModel),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleAddRecordToCollection = () => {
    fetch("http://localhost:5000/api/records", postOptions)
      .then((response) => {
        console.log(response);
        console.log(postOptions.body);
        return response;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={albumCardStyle}>
      <h3>{info.name}</h3>
      <h5>Artist: {info.artist}</h5>
      <button onClick={() => handleAddRecordToCollection()}>Add</button>
      <img alt={info.name} src={images.extraLarge} />
    </div>
  );
};

export default SearchedAlbum;
