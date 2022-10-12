import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";

const Users = ({ users }) => {
  return (
    <div className="users">
      {users &&
        users.map((user) => {
          return (
            <Link to={{ pathname: `users/${user.userName}`, state: { user } }}>
              <h1>{user.userName}</h1>
            </Link>
          );
        })}
    </div>
  );
};

export default Users;
