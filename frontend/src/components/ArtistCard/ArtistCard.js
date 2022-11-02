import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import "./ArtistCard.css";
const ArtistCard = ({ records, artist }) => {
  console.log(artist);
  const getArtistRecords = (artist) => {
    const artistRecords =
      records &&
      records.filter((record) => {
        return record.artist === artist;
      });

    return artistRecords;
  };

  console.log(getArtistRecords(artist));

  // returns an array of objects with each object being the small image album art
  // const getArtistRecordCoverArt = (targetArtist, imageSize) => {
  //   const artistRecords =
  //     records &&
  //     records.filter((album) => {
  //       return album.artist === targetArtist;
  //     });

  // console.log(artistRecords);
  // const artistRecordCovers =
  //   records &&
  //   artistRecords.map((album) => {
  //     return album.images[imageSize];
  //   });
  // return artistRecordCovers;
  // };

  // console.log(getArtistRecordCoverArt(artist));
  // var item = items[Math.floor(Math.random() * items.length)];

  return (
    <div className="artist-card-container">
      <div
        className="artist-album-image"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, 50%, black), url("${
            getArtistRecords(artist)[0].images.large
          }")`,
        }}
      ></div>
      <div className="artist-collection-details">
        {/* <div className="artist-collection-count"> */}
        <FontAwesomeIcon icon={faRecordVinyl} />
        <div className="count-container">
          <h2>{getArtistRecords(artist).length}</h2>
        </div>
        <h3>{artist}</h3>

        {/* <div className="record-icon-container">
            <FontAwesomeIcon icon={faRecordVinyl} className="record-icon" />
          </div>
          <div className="artist-name-container">
            <h2>{getArtistRecords(artist).length}</h2>
          </div> */}
        {/* </div> */}
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
