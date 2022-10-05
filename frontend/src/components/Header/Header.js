import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import "./Header.css";
import logo from "../../assets/RecordKeeprLogo60b0f4.png";
// const headerStyle = {
//   padding: "2%",
//   position: "relative",
// };

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header id="header">
      <div className="logo-container">
        <Link to={user ? "/dashboard" : "/"}>
          <img className="logo" src={logo} alt="Record Keeper Logo" />
        </Link>
      </div>
      <div className="login-container">
        <ul>
          {user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          ) : (
            <>
              {" "}
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
            </>
          )}
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
