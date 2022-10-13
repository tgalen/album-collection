import UserProfile from "../UserProfile/UserProfile";
import "./SearchUsers.css";

const SearchUSers = ({
  users,
  userSearchInput,
  setUserSearchInput,
  searchedUser,
  setSearchedUser,
}) => {
  const handleUserSearchInput = (e) => {
    setUserSearchInput(e.target.value);
  };

  const filteredUsersBySearchInput =
    users &&
    users.filter((user) => {
      return user.userName
        .toLowerCase()
        .includes(userSearchInput.toLowerCase().trim());
    });

  const handleClearUserSearch = () => {
    setSearchedUser(null);
    setUserSearchInput("");
  };
  const handleSelectUser = (user) => {
    setSearchedUser(user);
  };
  console.log(searchedUser);
  return (
    <div className="search-users-container">
      <div className="search-users-content">
        <h1>{`${users.length} registered users`}</h1>
        <input
          type="text"
          placeholder="Search Users"
          onChange={handleUserSearchInput}
          value={userSearchInput}
        ></input>
        <button onClick={handleClearUserSearch}>Clear Search</button>

        {userSearchInput !== "" &&
          filteredUsersBySearchInput.map((user) => {
            return (
              <button onClick={() => handleSelectUser(user)}>
                {user.userName}
              </button>
            );
          })}
        {searchedUser && <UserProfile searchedUser={searchedUser} />}
      </div>
    </div>
  );
};

export default SearchUSers;
