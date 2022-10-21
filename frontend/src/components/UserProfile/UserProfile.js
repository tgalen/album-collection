import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ArtistList from "../ArtistList/ArtistList";
import "./UserProfile.css";

const UserProfile = ({ searchedUser }) => {
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

  const collectedArtists =
    userCollection &&
    userCollection.map((record) => {
      return record.artist;
    });

  const filterDuplicateCollectedArtists =
    userCollection &&
    collectedArtists.filter(
      (artist, index) => collectedArtists.indexOf(artist) === index
    );

  const sortCollectedArtistsAlphabetically =
    userCollection &&
    filterDuplicateCollectedArtists.sort((a, b) => {
      return a.replace(/^The /, "") > b.replace(/^The /, "") ? 1 : -1;
    });

  const wishlistedArtists =
    userWishlist &&
    userWishlist.map((record) => {
      return record.artist;
    });

  const filterDuplicateWishlistedArtists =
    userWishlist &&
    wishlistedArtists.filter(
      (artist, index) => wishlistedArtists.indexOf(artist) === index
    );

  const sortWishlistedArtistsAlphabetically =
    userWishlist &&
    filterDuplicateWishlistedArtists.sort((a, b) => {
      return a.replace(/^The /, "") > b.replace(/^The /, "") ? 1 : -1;
    });

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

  const handleCollectionClick = () => {
    setRecordsToDisplay("collection");
  };
  console.log(recordsToDisplay);

  const handleWishlistClick = () => {
    setRecordsToDisplay("wishlist");
  };
  useEffect(() => {
    getUserCollectedRecords();
    getUserWishlistedRecords();
  }, []);
  // userCollection && console.log(userCollection);
  return (
    <div className="content-container">
      <section className="profile-nav-bar">
        <div className="user-display-container">
          <FaUser />
          <h1>{userName}</h1>
        </div>
        <div className="record-data-container">
          {userCollection && (
            <div className="collection-data-container">
              <button
                onClick={() => {
                  handleCollectionClick();
                }}
              >
                Collection
              </button>
            </div>
          )}
          {userWishlist && (
            <div className="wishlist-data-container">
              <button
                onClick={() => {
                  handleWishlistClick();
                }}
              >
                Wishlist
              </button>
            </div>
          )}
        </div>
      </section>
      {/* <div className="profile-nav-bar">
          <div className="user-display-container">
            <FaUser />
            <h1>{userName}</h1>
          </div>
          <div className="record-data-container">
            {userCollection && (
              <div className="collection-data-container">
                <h4>{`${userCollection.length} Collected`}</h4>
              </div>
            )}
            {userWishlist && (
              <div className="wishlist-data-container">
                <h4>{`${userWishlist.length} Wishlisted`}</h4>
              </div>
            )}
          </div> */}
      {/* </div> */}
      <section className="record-display">
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
