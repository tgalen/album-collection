import { useLocation } from "react-router-dom";
import CollectedRecord from "../CollectedRecord/CollectedRecord";

const ArtistsAlbums = ({ collection }) => {
  const location = useLocation();
  const artist = location.state;
  const collectedAlbumsByArtist =
    collection &&
    collection.filter((album) => album.artists[0].name === artist);
  return (
    <div>
      <h5>{artist}</h5>
      <div>
        {collectedAlbumsByArtist.map((album) => {
          return <CollectedRecord recordDetails={album} key={album._id} />;
        })}
      </div>
    </div>
  );
};

export default ArtistsAlbums;
