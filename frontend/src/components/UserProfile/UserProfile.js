import axios from "axios";
import { useEffect, useState } from "react";
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
        <h1>profile</h1>
        <p>{userName}</p>
        {/* <h1>{searchedUser && searchedUser.userName}</h1>
      <h3>{searchedUser && searchedUser.email}</h3> */}
        {userCollection && (
          <h5>{`${userCollection.length} collected records`}</h5>
        )}
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
      </div>
    </div>
  );
};

export default UserProfile;
