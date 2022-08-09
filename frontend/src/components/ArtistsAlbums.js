import { useLocation } from "react-router-dom";

const ArtistsAlbums = ({ collection }) => {
  const location = useLocation();
  const artist = location.state;
  return <div>{artist}</div>;
};

export default ArtistsAlbums;
