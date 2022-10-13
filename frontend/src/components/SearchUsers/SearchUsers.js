import "./SearchUsers.css";

const SearchUSers = ({ users, userSearchInput, setUserSearchInput }) => {
  const handleUserSearchInput = (e) => {
    setUserSearchInput(e.target.value);
  };

  const filteredUsersBySearchInput =
    users &&
    users.filter((user) => {
      return user.userName
        .toLowerCase()
        .includes(userSearchInput.toLowerCase());
    });

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
        <ul>
          {userSearchInput !== "" &&
            filteredUsersBySearchInput.map((user) => {
              return <li>{user.userName}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchUSers;
