const artistCardStyle = {
  width: "50%",
  height: "100px",
  border: "1px solid black",
  display: "inline-block",
};

const ArtistCard = ({ collection, artist }) => {
  // returns an array of objects with each object being the small image album art
  const getArtistRecordCoverArt = (artist) => {
    const artistRecords =
      collection &&
      collection.filter((album) => {
        return album.artists[0].name === artist;
      });
    const artistRecordCovers =
      collection &&
      artistRecords.map((album) => {
        return album.images[2];
      });
    return artistRecordCovers;
  };

  return (
    <div style={artistCardStyle}>
      <h3>{artist}</h3>
      <img
        src="https://img.icons8.com/ios-filled/50/000000/music-record.png"
        style={{ height: "50px", width: "50px", display: "inline" }}
      />
      <h3>{getArtistRecordCoverArt(artist).length}</h3>
    </div>
  );
};

export default ArtistCard;
