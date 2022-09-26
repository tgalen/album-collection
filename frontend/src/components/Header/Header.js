import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Header.css";
import logo from "../../assets/RecordKeeprLogo60b0f4.png";
// const headerStyle = {
//   padding: "2%",
//   position: "relative",
// };

const Header = () => {
  return (
    <header id="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Record Keeper Logo" />
      </div>
      <div className="login-container">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser />
              Register
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className="nav-container">
        <Link to="/">Collection</Link>
        <Link to="/searchspotify">Add Record</Link>
      </div> */}
    </header>
  );
};

//make a record station with some album cover decore, modern record table, speakers on sides

export default Header;
