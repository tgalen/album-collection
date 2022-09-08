import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/recordkeeperlogo.png";
// const headerStyle = {
//   padding: "2%",
//   position: "relative",
// };

const Header = () => {
  return (
    <div id="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Record Keeper Logo" />
      </div>
      <div className="nav-container">
        <Link to="/">Collection</Link>
        <Link to="/searchspotify">Add Record</Link>
      </div>
    </div>
  );
};

export default Header;
