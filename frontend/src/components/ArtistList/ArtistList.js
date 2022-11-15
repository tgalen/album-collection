import ArtistCard from "../ArtistCard/ArtistCard";
import NoRecordsToDisplay from "../NoRecordsToDisplay.js/NoRecordsToDisplay";
import "./ArtistList.css";

const ArtistList = ({
  records,
  recordsToDisplay,
  userWishlist,
  userCollection,
}) => {
  console.log(records);
  const artists =
    records &&
    records.map((record) => {
      return record.artist;
    });
  console.log(artists);

  const filterDuplicateArtists =
    records &&
    artists.filter((artist, index) => artists.indexOf(artist) === index);

  const sortArtistsAlphabetically =
    records &&
    filterDuplicateArtists.sort((a, b) => {
      return a.replace(/^The /, "") > b.replace(/^The /, "") ? 1 : -1;
    });
  console.log(sortArtistsAlphabetically);
  if (!records) {
    return <NoRecordsToDisplay />;
  }

  return (
    <div className="list-container">
      {sortArtistsAlphabetically.map((artist) => {
        console.log(artist);
        return (
          //   <div>hi</div>
          <ArtistCard
            artist={artist}
            records={records}
            key={artist}
            recordsToDisplay={recordsToDisplay}
            userWishlist={userWishlist}
            userCollection={userCollection}
          />
        );
      })}
    </div>
  );
};

export default ArtistList;
