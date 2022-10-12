import "./SearchUsers.css";

const SearchUSers = ({ users }) => {
  return (
    <div className="search-users-container">
      <div className="search-users-content">
        <h1>{`${users.length} registered users`}</h1>
        <input type="text" placeholder="Search Users"></input>
      </div>
    </div>
  );
};

export default SearchUSers;
