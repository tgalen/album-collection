import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import RecordDisplay from "../RecordDisplay/RecordDisplay";
import "./Dashboard.css";

const Dashboard = ({ users }) => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
  const [recordsToDisplay, setRecordsToDisplay] = useState("Collection");
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const readOnly = false;
  const { user } = useSelector((state) => state.auth);
  const COLLECTED_RECORDS_API =
    "http://localhost:5000/api/records/collectedrecords/";

  const WISHLISTED_RECORDS_API =
    "http://localhost:5000/api/records/wishlistedrecords/";

  const getUserCollectedRecords = async () => {
    setUserCollection(null);

    const response = await axios.get(COLLECTED_RECORDS_API + user.userName);
    response && console.log(response);
    setUserCollection(response.data);
  };

  const getUserWishlistedRecords = async () => {
    setUserWishlist(null);

    const response = await axios.get(WISHLISTED_RECORDS_API + user.userName);
    setUserWishlist(response.data);
  };

  useEffect(() => {
    getUserCollectedRecords();
    getUserWishlistedRecords();
  }, []);

  const handleCollectionClick = () => {
    setRecordsToDisplay("Collection");
  };

  const handleWishlistClick = () => {
    setRecordsToDisplay("Wishlist");
  };

  const handleSearchInput = (e) => {
    setArtistSearchTerm(e.target.value.trim());
  };

  const sortCollectedArtistsAlphabetically =
    userCollection &&
    userCollection.sort((a, b) => {
      return a.artist.replace(/^The /, "") > b.artist.replace(/^The /, "")
        ? 1
        : -1;
    });

  const sortWishlistedArtistsAlphabetically =
    userWishlist &&
    userWishlist.sort((a, b) => {
      return a.artist.replace(/^The /, "") > b.artist.replace(/^The /, "")
        ? 1
        : -1;
    });

  const filteredCollection =
    userCollection &&
    sortCollectedArtistsAlphabetically.filter((record) =>
      record.artist.toLowerCase().includes(artistSearchTerm.toLocaleLowerCase())
    );

  const filteredWishlist =
    userWishlist &&
    sortWishlistedArtistsAlphabetically.filter((record) =>
      record.artist.toLocaleLowerCase().includes()
    );

  return (
    <div className="dashboard-container">
      <h1>Welcome {user && user.userName}</h1>
      <Link to="/searchrecordstoadd">
        <button className="search-external-btn">Search Records To Add</button>
      </Link>

      <div className="record-display-header-container">
        <h2>{recordsToDisplay}</h2>
      </div>
      <section className="dashboard-nav-bar">
        <div className="record-nav-container">
          <button
            onClick={() => {
              handleCollectionClick();
            }}
          >
            Collection
          </button>

          <button
            onClick={() => {
              handleWishlistClick();
            }}
          >
            Wishlist
          </button>
        </div>
      </section>
      <div className="search-container">
        <FaSearch />
        <input
          type="search"
          placeholder="Search Artists"
          value={artistSearchTerm}
          onChange={handleSearchInput}
        ></input>
      </div>
      <section className="dashboard-record-display">
        {recordsToDisplay === "Collection"
          ? userCollection &&
            filteredCollection.map((record) => {
              return (
                <RecordDisplay
                  record={record}
                  recordsToDisplay={recordsToDisplay}
                  userWishlist={userWishlist}
                  userCollection={userCollection}
                  setUserCollection={setUserCollection}
                  setUserWishlist={setUserWishlist}
                  readOnly={readOnly}
                />
              );
            })
          : userWishlist &&
            filteredWishlist.map((record) => {
              return (
                <RecordDisplay
                  record={record}
                  recordsToDisplay={recordsToDisplay}
                  userWishlist={userWishlist}
                  userCollection={userCollection}
                  setUserCollection={setUserCollection}
                  setUserWishlist={setUserWishlist}
                  readOnly={readOnly}
                />
              );
            })}
      </section>
    </div>
  );
};

export default Dashboard;
