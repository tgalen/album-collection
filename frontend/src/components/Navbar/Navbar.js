import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="navbar">
      <ul className="nav-menu">
        {!user && (
          <li>
            <Link to="/register">Create Account</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li>
          <Link to={user ? "/dashboard" : "/"}>Home</Link>
        </li>

        <li>
          <Link to="/searchusers">Search Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
