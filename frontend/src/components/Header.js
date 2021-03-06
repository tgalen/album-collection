import { Link } from "react-router-dom";
const headerStyle = {
  padding: "2%",
  position: "relative",
};

const navStyle = {
  position: "absolute",
  left: "2%",
};

const Header = () => {
  return (
    <div style={headerStyle}>
      <h1 style={{ margin: "0", textAlign: "center" }}>
        Tim's Record Collection
      </h1>
      <div styile={navStyle}>
        <Link to="/">
          <button>Collection</button>
        </Link>
        <Link to="/searchspotify">
          <button>Add Record</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
