import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/searchrecordstoadd">
        <button>Search for Records to Add</button>
      </Link>
    </div>
  );
};

export default Dashboard;
