import { useState } from "react";

const SearchLastfm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSeachResults] = useState(null);
  const SEARCH_ENDPOINT =
    "http://ws.audioscrobbler.com/2.0/?method=album.search&album=";
  const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;
  const handleSearch = () => {
    fetch(
      `${SEARCH_ENDPOINT}${searchTerm}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
    )
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.results.albummatches.album);
        setSeachResults(data.results.albummatches.album);
      });
  };

  const handleInputOnchange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputOnchange}
      ></input>
      <button onClick={handleSearch}>Search</button>
      {searchResults &&
        searchResults.map((album) => {
          return (
            <div>
              <h3>{album.name}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default SearchLastfm;
