// import CollectedRecord from "./CollectedRecord";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "../ArtistCard/ArtistCard";
import "./Collection.css";

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

  return (
    <div>
      <div id="alphabet-container">
        {alphabet.map((letter) => {
          return (
            <div
              id={
                artistLetterFilter === letter
                  ? "selected-letter-container"
                  : "letter-container"
              }
              key={letter}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div>
        <h2 style={{ marginLeft: "1%" }}>Artists {artistLetterFilter}</h2>
        <div id="artists-container">
          {collection &&
            filterSortedArtistsByLetter.map((artist) => {
              return (
                <Link to={`${artist}`} state={artist} key={artist}>
                  <ArtistCard
                    collection={collection}
                    artist={artist}
                    key={artist}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
