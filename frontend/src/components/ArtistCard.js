const artistCardStyle = {
  width: "100%",
  height: "100px",
  //   border: "1px solid black",
  display: "flex",
  margin: "0.5%",
  padding: "0.3%",
  position: "relative",
  borderRadius: "5px",
  boxShadow: "2px 2px 2px gray",
  backgroundColor: "snow",
};

const numOfRecordsByArtistStyle = {
  display: "inline-block",
  height: "20px",
  marginTop: "1%",
  position: "absolute",
  bottom: "15%",
};

const albumArtContainerStyle = {
  position: "absolute",
  right: "2px",
  bottom: "5%",
  height: "90%",
  width: "50%",
  display: "inline-block",
};

const coverArtContainerStyle = {
  float: "right",
  margin: "1px",
  marginTop: "20px",
};
const ArtistCard = ({ collection, artist }) => {
  // returns an array of objects with each object being the small image album art
  const getArtistRecordCoverArt = (targetArtist) => {
    const artistRecords =
      collection &&
      collection.filter((album) => {
        return album.artists[0].name === targetArtist;
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
      <div style={numOfRecordsByArtistStyle}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/music-record.png"
          alt="recordIcon"
          style={{
            height: "20px",
            width: "20px",
            display: "inline",
            margin: "auto",
          }}
        />
        <h2 style={{ display: "inline", padding: "5px" }}>
          {getArtistRecordCoverArt(artist).length}
        </h2>
      </div>
      <div style={albumArtContainerStyle}>
        {getArtistRecordCoverArt(artist).map((cover) => {
          return (
            <div style={coverArtContainerStyle}>
              <img src={cover.url} alt={artist} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistCard;
