import "./ArtistCard.css";

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
    <div className="artist-card">
      <h3>{artist}</h3>
      <div className="artist-record-count">
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
      <div className="album-art-container">
        {getArtistRecordCoverArt(artist).map((cover, index) => {
          return (
            <div className="album-art" key={index}>
              <img src={cover.url} alt={artist} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistCard;
