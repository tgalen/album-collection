import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchedUser from "../SearchedUser/SearchedUser";
import UserProfile from "../UserProfile/UserProfile";
import "./SearchUsers.css";

const SearchUSers = ({ users, userSearchInput, setUserSearchInput }) => {
  const handleUserSearchInput = (e) => {
    setUserSearchInput(e.target.value.trim());
  };

  const filteredUsersBySearchInput =
    users &&
    users.filter((user) => {
      return user.userName
        .toLowerCase()
        .includes(userSearchInput.toLowerCase().trim());
    });

  const handleClearUserSearch = () => {
    setUserSearchInput("");
  };

  return (
    <div className="search-users-container">
      <section className="search-users-header">
        <h1>Search Users</h1>
        <h5>{`${users.length} registered users`}</h5>
        <p>Find a user and view their collection and wishlist</p>
        <div className="search-input-container">
          <input
            className="search-user-input"
            type="text"
            placeholder="Search Users"
            onChange={handleUserSearchInput}
            value={userSearchInput}
          ></input>
          <button className="clear-search-btn" onClick={handleClearUserSearch}>
            Clear Search
          </button>
        </div>
      </section>
      <section className="search-users-input"></section>
      <div className="searched-users-display">
        {userSearchInput !== "" && (
          <div>
            <h3>{`${filteredUsersBySearchInput.length} matching users`}</h3>
          </div>
        )}

        {userSearchInput !== "" && (
          <div className="search-results">
            {" "}
            {filteredUsersBySearchInput.map((user) => {
              return (
                <SearchedUser
                  user={user}
                  setUserSearchInput={setUserSearchInput}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUSers;
