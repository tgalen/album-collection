import { useNavigate } from "react-router-dom";
import "./SearchedUser.css";

const SearchedUser = ({ user, setUserSearchInput }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/userprofile/${user.userName}`);
        setUserSearchInput("");
      }}
    >
      {user.userName}
    </button>
  );
};

export default SearchedUser;
