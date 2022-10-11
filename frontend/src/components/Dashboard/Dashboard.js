import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Welcome {user && user.userName}</h3>
      <Link to="/searchrecordstoadd">
        <button>Search for Records to Add</button>
      </Link>
    </div>
  );
};

export default Dashboard;
