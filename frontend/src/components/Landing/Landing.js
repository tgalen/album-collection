import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="landing-header">
        <h1>
          Welcome to <span>RecordKeepr</span>
        </h1>
        <p>Keep track of your record collection</p>
        <br />
        <p>Keep track of the records you want to collect</p>
        <br />
        <p>Share with friends</p>
      </section>
      <section className="landing-links">
        <Link to="/register">
          <div>Register</div>
        </Link>
        <Link to="/login">
          <div>Login</div>
        </Link>
        <Link to="/searchusers">
          <div>Search Users</div>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
