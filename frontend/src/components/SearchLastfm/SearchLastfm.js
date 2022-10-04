import { useState } from "react";

const SearchLastfm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSeachResults] = useState(null);
  const SEARCH_ENDPOINT =
    "https://ws.audioscrobbler.com//2.0/?method=album.search&album=michael jackson&api_key=2c4fd52145257176196ced61eb35b2df&format=json";

  return <div></div>;
};

export default SearchLastfm;
