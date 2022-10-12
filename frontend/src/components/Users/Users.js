import axios from "axios";
import { useEffect, useState } from "react";

const USERS_API = "http://localhost:5000/api/users/";

const Users = () => {
  const [users, setUsers] = useState(null);
  console.log(users);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(USERS_API);
      console.log(response.data);
      console.log(response.data.length);
      console.log(typeof response.data);
      //   const response = await usersData.json();
      setUsers(response.data);
    };
    getUsers();
  }, []);
  return (
    <div className="users">
      {users &&
        users.map((user) => {
          return <h3>{user.userName}</h3>;
        })}
    </div>
  );
};

export default Users;
