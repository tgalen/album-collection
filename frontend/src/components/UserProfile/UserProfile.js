import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ArtistList from "../ArtistList/ArtistList";
import "./UserProfile.css";

// need spinner for null and NoRecordsToDisplay for .length === 0
const UserProfile = () => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
  const [recordsToDisplay, setRecordsToDisplay] = useState("collection");
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
    setRecordsToDisplay("collection");
  };

  const handleWishlistClick = () => {
    setRecordsToDisplay("wishlist");
  };
  // userCollection && console.log(userCollection);
  return (
    <div className="content-container">
      <section className="profile-nav-bar">
        <div className="user-display-container">
          <FaUser />
          <h1>{userName}</h1>
        </div>
        <div className="record-data-container">
          <div className="collection-data-container">
            <button
              onClick={() => {
                handleCollectionClick();
              }}
            >
              Collection
            </button>
          </div>

          <div className="wishlist-data-container">
            <button
              onClick={() => {
                handleWishlistClick();
              }}
            >
              Wishlist
            </button>
          </div>
        </div>
      </section>
      <section className="record-display">
        {console.log(recordsToDisplay)}
        <ArtistList
          records={
            recordsToDisplay === "collection" ? userCollection : userWishlist
          }
        />
      </section>
    </div>
  );
};

export default UserProfile;
