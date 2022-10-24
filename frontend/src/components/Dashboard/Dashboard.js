import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = ({ users }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h3>Welcome {user && user.userName}</h3>
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
