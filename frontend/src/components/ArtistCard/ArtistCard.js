import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import "./ArtistCard.css";
const ArtistCard = ({ collection, artist }) => {
  // returns an array of objects with each object being the small image album art
  const getArtistRecordCoverArt = (targetArtist, imageSize) => {
    const artistRecords =
      collection &&
      collection.filter((album) => {
        return album.artists[0].name === targetArtist;
      });
    const artistRecordCovers =
      collection &&
      artistRecords.map((album) => {
        return album.images[imageSize];
      });
    return artistRecordCovers;
  };

  // console.log(getArtistRecordCoverArt(artist));

  return (
    <div className="artist-card-container">
      <div
        className="artist-album-image"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, 50%, black), url("${
            getArtistRecordCoverArt(artist, 0)[0].url
          }")`,
        }}
      ></div>
      <div className="artist-collection-details">
        <h3>{artist}</h3>
        <div className="artist-collection-count">
          <FontAwesomeIcon icon={faRecordVinyl} className="record-icon" />
          <h2>{getArtistRecordCoverArt(artist).length}</h2>
        </div>
      </div>
    </div>
    // <div
    //   className="artist-card"
    //   style={{
    //     backgroundImage: `url("${getArtistRecordCoverArt(artist, 0)[0].url}")`,
    //   }}
    // >
    //   <h3>{artist}</h3>
    //   <div className="artist-record-count">
    //     <img
    //       src="https://img.icons8.com/ios-filled/50/000000/music-record.png"
    //       alt="recordIcon"
    //       style={{
    //         height: "20px",
    //         width: "20px",
    //         display: "inline",
    //         margin: "auto",
    //       }}
    //     />
    //     <h2 style={{ display: "inline", padding: "5px" }}>
    //       {getArtistRecordCoverArt(artist).length}
    //     </h2>
    //   </div>
    //   <div className="album-art-container">
    //     {getArtistRecordCoverArt(artist, 2).map((cover, index) => {
    //       return (
    //         <div className="album-art" key={index}>
    //           <img src={cover.url} alt={artist} />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default ArtistCard;
