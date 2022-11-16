import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import ArtistList from "../ArtistList/ArtistList";
import RecordDisplay from "../RecordDisplay/RecordDisplay";
import "./Dashboard.css";

const Dashboard = ({ users }) => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
  const [recordsToDisplay, setRecordsToDisplay] = useState("Collection");
  const { user } = useSelector((state) => state.auth);
  const COLLECTED_RECORDS_API =
    "http://localhost:5000/api/records/collectedrecords/";

  const WISHLISTED_RECORDS_API =
    "http://localhost:5000/api/records/wishlistedrecords/";

  console.log(userWishlist);

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

  const sortCollectedArtistsAlphabetically =
    userCollection &&
    userCollection.sort((a, b) => {
      if (a.artist) {
        return a.artist.replace(/^The /, "") > b.artist.replace(/^The /, "")
          ? 1
          : -1;
      }
    });

  const sortWishlistedArtistsAlphabetically =
    userWishlist &&
    userWishlist.sort((a, b) => {
      if (a.artist) {
        return a.artist.replace(/^The /, "") > b.artist.replace(/^The /, "")
          ? 1
          : -1;
      }
    });

  return (
    <div className="dashboard-container">
      <h1>Welcome {user && user.userName}</h1>
      <Link to="/searchrecordstoadd">
        <button className="search-external-btn">Search Records To Add</button>
      </Link>

      {/* {userCollection && (
        <section className="record-display">
          <h3>Collection</h3>
          <ArtistList records={userCollection} />
        </section>
      )}
      {userWishlist && (
        <section className="record-display">
          <h3>Wishlist</h3>
          <ArtistList records={userWishlist} />
        </section>
      )} */}
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
      <section className="dashboard-record-display">
        {/* <ArtistList
          records={
            recordsToDisplay === "Collection" ? userCollection : userWishlist
          }
          recordsToDisplay={recordsToDisplay}
          userCollection={userCollection}
          userWishlist={userWishlist}
          setUserCollection={setUserCollection}
          setUserWishlist={setUserWishlist}
        /> */}
        {recordsToDisplay === "Collection"
          ? userCollection &&
            sortCollectedArtistsAlphabetically.map((record) => {
              return (
                <RecordDisplay
                  record={record}
                  recordsToDisplay={recordsToDisplay}
                  userWishlist={userWishlist}
                  userCollection={userCollection}
                  setUserCollection={setUserCollection}
                  setUserWishlist={setUserWishlist}
                />
              );
            })
          : userWishlist &&
            sortWishlistedArtistsAlphabetically.map((record) => {
              return (
                <RecordDisplay
                  record={record}
                  recordsToDisplay={recordsToDisplay}
                  userWishlist={userWishlist}
                  userCollection={userCollection}
                  setUserCollection={setUserCollection}
                  setUserWishlist={setUserWishlist}
                />
              );
            })}
      </section>
    </div>
  );
};

export default Dashboard;
