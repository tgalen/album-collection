import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import RecordDisplay from "../RecordDisplay/RecordDisplay";
import "./UserProfile.css";

// need spinner for null and NoRecordsToDisplay for .length === 0
const UserProfile = () => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
  const [recordsToDisplay, setRecordsToDisplay] = useState("Collection");
  const readOnly = true;
  const COLLECTED_RECORDS_API =
    "http://localhost:5000/api/records/collectedrecords/";

  const WISHLISTED_RECORDS_API =
    "http://localhost:5000/api/records/wishlistedrecords/";

  const currentURL = window.location.href;
  const splitURL = currentURL.split("/");
  const userName = splitURL[splitURL.length - 1];

  const getUserCollectedRecords = async () => {
    setUserCollection(null);

    const response = await axios.get(COLLECTED_RECORDS_API + userName);
    response && console.log(response);
    setUserCollection(response.data);
  };

  const getUserWishlistedRecords = async () => {
    setUserWishlist(null);

    const response = await axios.get(WISHLISTED_RECORDS_API + userName);
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
  // userCollection && console.log(userCollection);
  return (
    <div className="profile-content-container">
      <header className="user-display-header">
        <FaUser />
        <h1>{userName}</h1>
        <button>Favorite</button>
      </header>
      <div className="record-display-header-container">
        <h2>{recordsToDisplay}</h2>
      </div>
      <section className="profile-nav-bar">
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
      <section className="record-display">
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
                />
              );
            })}
      </section>
    </div>
  );
};

export default UserProfile;
