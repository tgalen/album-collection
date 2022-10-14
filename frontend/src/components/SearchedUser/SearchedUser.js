import { useNavigate } from "react-router-dom";

const SearchedUser = ({ user }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/userprofile/${user.userName}`);
      }}
    >
      {user.userName}
    </button>
  );
};

export default SearchedUser;
