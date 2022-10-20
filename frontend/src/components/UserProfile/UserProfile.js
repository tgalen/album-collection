import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ArtistCard from "../ArtistCard/ArtistCard";
import "./UserProfile.css";

const UserProfile = ({ searchedUser }) => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
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

  useEffect(() => {
    getUserCollectedRecords();
    getUserWishlistedRecords();
  }, []);
  // userCollection && console.log(userCollection);
  return (
    <div className="profile-container">
      <div className="content-container">
        <div className="profile-nav-bar">
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
          </div>
        </div>

        {/* <h1>{searchedUser && searchedUser.userName}</h1>
      <h3>{searchedUser && searchedUser.email}</h3> */}
        {userCollection && (
          <h5>{`${userCollection.length} collected records`}</h5>
        )}

        {userCollection &&
          sortCollectedArtistsAlphabetically.map((artist) => {
            return (
              <ArtistCard
                artist={artist}
                records={userCollection}
                key={artist}
              />
            );
          })}
        {userCollection &&
          userCollection.map((record) => {
            return (
              <div key={record.name}>
                <h3>{record.name}</h3>
                <h4>{record.artist}</h4>
                <img src={record.images.large} alt={record.name} />
              </div>
            );
          })}
        {userWishlist && <h5>{`${userWishlist.length} wishlisted records`}</h5>}
        {userWishlist &&
          sortWishlistedArtistsAlphabetically.map((artist) => (
            <h3>{artist}</h3>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
