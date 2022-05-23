import CollectedRecord from "./CollectedRecord";

const collectionContainerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "17%",
  gap: "1%",
  overflowX: "auto",
  overscrollBehaviorInline: "contain",
  width: "100%",
};

const alphabetContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "10px",
  width: "100%",
};

const letterContainerStyle = {
  background: "lightblue",
  width: "2.5%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
};

const collectedRecordStyle = {
  padding: "1%",
};

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Collection = ({ collection }) => {
  const handleMouseEnterLetter = (e) => {
    e.target.style.background = "yellow";
    e.target.style.cursor = "pointer";
  };

  const handleMouseLeaveLetter = (e) => {
    e.target.style.background = "lightblue";
  };

  const filterDuplicateArtists = collection.filter(
    (record, index) => collection.indexOf(record.artists.name) === index
  );

  console.log(filterDuplicateArtists);

  const collectedArtists = collection.map((record) => {
    return record.artists[0].name;
  });

  console.log(collectedArtists);

  const filterCollectedArtistsDuplicates = collectedArtists.filter(
    (artist, index) => collectedArtists.indexOf(artist) === index
  );

  console.log(filterCollectedArtistsDuplicates);

  const getArtistRecordCoverArt = (artist) => {
    // returns an array of objects with each object being the small image album art
    const artistRecords = collection.filter((album) => {
      return album.artists[0].name === artist;
    });
    const artistRecordCovers = artistRecords.map((album) => {
      return album.images[2];
    });
    return artistRecordCovers;
  };

  console.log(getArtistRecordCoverArt("The Beatles"));

  return (
    <div>
      <h1>Collection</h1>
      <div style={alphabetContainerStyle}>
        {alphabet.map((letter) => {
          return (
            <div
              style={letterContainerStyle}
              onMouseEnter={handleMouseEnterLetter}
              onMouseLeave={handleMouseLeaveLetter}
              key={letter}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div style={collectionContainerStyle}>
        {collection ? (
          collection.map((album) => {
            return (
              <CollectedRecord
                style={collectedRecordStyle}
                key={album.spotify_id}
                recordDetails={album}
              />
            );
          })
        ) : (
          <h1>Such empty. Add some records by searching</h1>
        )}
      </div>
      <div>
        <h2>Artists</h2>
        <div>
          {filterCollectedArtistsDuplicates.map((artist) => {
            return (
              <div
                style={{
                  width: "10%",
                  height: "5%",
                  border: "1px solid black",
                }}
              >
                <h4>{artist}</h4>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/music-record.png"
                  style={{ display: "inline-block" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
