import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="landing-header">
        <h1>Welcome to RecordKeepr</h1>
        <p>Keep a record of your records</p>
        <Link to="/register">
          <div>Register</div>
        </Link>
        <Link to="/searchusers">
          <div>Search Users</div>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
