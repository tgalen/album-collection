import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import ArtistList from "../ArtistList/ArtistList";
import "./Dashboard.css";

const Dashboard = ({ users }) => {
  const [userCollection, setUserCollection] = useState(null);
  const [userWishlist, setUserWishlist] = useState(null);
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
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h3>Welcome {user && user.userName}</h3>
      <Link to="/searchrecordstoadd">
        <button>Search for Records to Add</button>
      </Link>
      <Link to="/searchusers">
        <div>Search Users</div>
      </Link>
      {userCollection && (
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
      )}
    </div>
  );
};

export default Dashboard;
