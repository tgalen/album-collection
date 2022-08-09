import { Link } from "react-router-dom";
import "./Header.css";
// const headerStyle = {
//   padding: "2%",
//   position: "relative",
// };

const Header = () => {
  return (
    <div id="header">
      <h1>Tim's Record Collection</h1>
      <div className="nav-container">
        <Link to="/">Collection</Link>
        <Link to="/searchspotify">Add Record</Link>
      </div>
    </div>
  );
};

export default Header;
