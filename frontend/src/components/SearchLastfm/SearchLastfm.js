import { useState } from "react";

const SearchLastfm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSeachResults] = useState(null);
  const SEARCH_ENDPOINT =
    "http://ws.audioscrobbler.com/2.0/?method=album.search&album=";

  const handleSearch = () => {
    fetch(
      `${SEARCH_ENDPOINT}${searchTerm}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json&limit=20`
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
          let targetKey = Object.keys(album.image[0])[0];
          return (
            <div>
              <h3>{album.name}</h3>
              <img src={album.image[2][targetKey]} />
            </div>
          );
        })}
    </div>
  );
};

export default SearchLastfm;
