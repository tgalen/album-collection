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
            <Link to="/register">
              <div className="nav-link">
                <span>Create Account</span>
              </div>
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">
              <div className="nav-link">
                <span>Login</span>
              </div>
            </Link>
          </li>
        )}

        <li>
          <Link to={user ? "/dashboard" : "/"}>
            <div className="nav-link">
              <span>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link to="/searchusers">
            <div className="nav-link">
              <span>Search Users</span>
            </div>
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/searchrecordstoadd">
              <div className="nav-link">
                <span>Add Records</span>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
