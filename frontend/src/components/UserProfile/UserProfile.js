import axios from "axios";
import { useEffect, useState } from "react";
import "./UserProfile.css";

const UserProfile = ({ searchedUser }) => {
  const [userCollection, setUserCollection] = useState(null);
  const COLLECTED_RECORDS_API =
    "http://localhost:5000/api/records/collectedrecords/";

  const currentURL = window.location.href;
  const splitURL = currentURL.split("/");
  const userName = splitURL[splitURL.length - 1];

  const getUserCollectedRecords = async () => {
    console.log(searchedUser);
    setUserCollection(null);

    const response = await axios.get(COLLECTED_RECORDS_API + userName);
    response && console.log(response);
    setUserCollection(response.data);
  };
  useEffect(() => {
    getUserCollectedRecords();
  }, []);
  // userCollection && console.log(userCollection);
  return (
    <div className="profile-container">
      <div className="content-container">
        <h1>profile</h1>
        <p>{currentURL}</p>
        <p>{splitURL}</p>
        <p>{userName}</p>
        {/* <h1>{searchedUser && searchedUser.userName}</h1>
      <h3>{searchedUser && searchedUser.email}</h3> */}
        {userCollection && (
          <h5>{`${userCollection.length} collected records`}</h5>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
