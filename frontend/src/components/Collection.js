// import CollectedRecord from "./CollectedRecord";
import { useState } from "react";
import ArtistCard from "./ArtistCard";

const alphabetContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  borderRadius: "10px",
  width: "98%",
  padding: "1%",
};

const letterContainerStyle = {
  background: "lightblue",
  width: "2.5%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
};

const selectedLetterContainerStyle = {
  background: "pink",
  width: "2.5%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
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

const artistContainerStyle = {
  height: "fit-content",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
};

const Collection = ({ collection }) => {
  const [artistLetterFilter, setArtistLetterFilter] = useState(null);

  const collectedArtists =
    collection &&
    collection.map((record) => {
      return record.artists[0].name;
    });

  const filterCollectedArtistsDuplicates =
    collection &&
    collectedArtists.filter(
      (artist, index) => collectedArtists.indexOf(artist) === index
    );

  const sortFilteredCollectedArtistsAlphabetically =
    collection &&
    filterCollectedArtistsDuplicates.sort(function (a, b) {
      // Return 1 left hand side (a) is greater, -1 if not greater.
      return a.replace(/^The /, "") > b.replace(/^The /, "") ? 1 : -1;
    });

  // filter by first letter of artist excluding "the"
  const filterSortedArtistsByLetter =
    collection &&
    sortFilteredCollectedArtistsAlphabetically.filter((artist) => {
      if (artistLetterFilter) {
        return artist.replace(/^The /, "")[0] === artistLetterFilter;
      }
      return artist;
    });

  const handleLetterClick = (letter) => {
    artistLetterFilter === letter
      ? setArtistLetterFilter(null)
      : setArtistLetterFilter(letter);
  };

  const handleMouseEnterLetter = (e) => {
    e.target.style.cursor = "pointer";
  };

  return (
    <div>
      <div style={alphabetContainerStyle}>
        {alphabet.map((letter) => {
          return (
            <div
              style={
                artistLetterFilter === letter
                  ? selectedLetterContainerStyle
                  : letterContainerStyle
              }
              key={letter}
              onClick={() => handleLetterClick(letter)}
              onMouseEnter={handleMouseEnterLetter}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div>
        <h2 style={{ marginLeft: "1%" }}>Artists {artistLetterFilter}</h2>
        <div style={artistContainerStyle}>
          {collection &&
            filterSortedArtistsByLetter.map((artist) => {
              return (
                <ArtistCard
                  collection={collection}
                  artist={artist}
                  key={artist}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
