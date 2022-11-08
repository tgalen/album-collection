import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaSearch,
  FaHome,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import "./Header.css";
import logo from "../../assets/RecordKeeprLogo60b0f4.png";
// const headerStyle = {
//   padding: "2%",
//   position: "relative",
// };

const Header = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const toggleClick = () => {
    setActive(!isActive);
  };

  const handleActiveFalse = () => {
    setActive(false);
  };

  return (
    <header className="header">
      <div className="brand-container">
        <h1>RecordKeepr</h1>
      </div>
      <button className="toggle-button" onClick={() => toggleClick()}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav
        className="nav-container"
        style={{
          display: windowSize.innerWidth > 800 || isActive ? "flex" : "none",
        }}
      >
        <ul>
          <li>
            <Link
              to={user ? "/dashboard" : "/"}
              onClick={() => handleActiveFalse()}
            >
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/searchusers" onClick={() => handleActiveFalse()}>
              <FaSearch />
              Users
            </Link>
          </li>
          {user ? (
            <li>
              <Link onClick={onLogout} to="/">
                <FaSignOutAlt />
                Logout
              </Link>
            </li>
          ) : (
            <>
              {" "}
              <li>
                <Link to="/login" onClick={() => handleActiveFalse()}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => handleActiveFalse()}>
                  <FaUser />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

//make a record station with some album cover decore, modern record table, speakers on sides

export default Header;
