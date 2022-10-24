import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = ({ users }) => {
  const { loggedInUser } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome {loggedInUser && loggedInUser.userName}</h3>
      <Link to="/searchrecordstoadd">
        <button>Search for Records to Add</button>
      </Link>
      <Link to="/searchusers">
        <div>Search Users</div>
      </Link>
    </div>
  );
};

export default Dashboard;
