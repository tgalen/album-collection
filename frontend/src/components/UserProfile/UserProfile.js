import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = ({ searchedUser }) => {
  const [userCollection, setUserCollection] = useState(null);
  const COLLECTED_RECORDS_API =
    "http://localhost:5000/api/records/collectedrecords/";

  const getUserCollectedRecords = async () => {
    console.log(searchedUser);
    setUserCollection(null);

    const response = await axios.get(
      COLLECTED_RECORDS_API + searchedUser.userName
    );
    response && console.log(response);
    setUserCollection(response.data);
  };
  console.log(searchedUser.userName);
  useEffect(() => {
    getUserCollectedRecords();
  }, [searchedUser]);
  userCollection && console.log(userCollection);
  return (
    <div>
      <h1>profile</h1>
      <h1>{searchedUser && searchedUser.userName}</h1>
      <h3>{searchedUser && searchedUser.email}</h3>
      {userCollection && (
        <h5>{`${userCollection.length} collected records`}</h5>
      )}
    </div>
  );
};

export default UserProfile;
