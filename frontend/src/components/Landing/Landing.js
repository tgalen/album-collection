import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="content">
        <h2>Welcome to RecordKeepr</h2>
        <p>Keep a record of your records</p>
        <Link to="/register">
          <div>Register</div>
        </Link>
        <Link to="/searchusers">
          <div>Search Users</div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
