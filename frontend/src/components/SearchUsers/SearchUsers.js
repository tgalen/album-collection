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

        {userSearchInput !== "" &&
          filteredUsersBySearchInput.map((user) => {
            return (
              <button onClick={() => handleSelectUser(user)}>
                {user.userName}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SearchUSers;
