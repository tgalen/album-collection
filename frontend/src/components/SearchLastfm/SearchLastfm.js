import { useState } from "react";
import SearchedAlbum from "../SearchedAlbum/SearchedAlbum";
import "./SearchLastfm.css";

const SearchLastfm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSeachResults] = useState(null);

  const NODE_ENDPOINT = `http://localhost:5000/search/${searchTerm}`;

  const handleSearch = () => {
    // change to axios
    fetch(NODE_ENDPOINT)
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
    <div className="search-lastfm-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputOnchange}
      ></input>
      <button onClick={handleSearch}>Search</button>
      {searchResults &&
        searchResults.map((album, index) => {
          let targetKey = Object.keys(album.image[0])[0];
          const images = {
            small: album.image[0][targetKey],
            medium: album.image[1][targetKey],
            large: album.image[2][targetKey],
            extraLarge: album.image[3][targetKey],
          };
          return <SearchedAlbum key={index} info={album} images={images} />;
        })}
    </div>
  );
};

export default SearchLastfm;
