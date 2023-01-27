import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchLastfm from "./components/SearchLastfm/SearchLastfm";
import UserProfile from "./components/UserProfile/UserProfile";
import SearchUsers from "./components/SearchUsers/SearchUsers";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);
  const [userSearchInput, setUserSearchInput] = useState("");
  const USERS_API = "https://recordkeepr.herokuapp.com/api/users/";

  const getUsers = async () => {
    const response = await axios.get(USERS_API);
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard users={users} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/searchrecordstoadd" element={<SearchLastfm />} />
          <Route
            path="/searchusers"
            element={
              <SearchUsers
                users={users}
                userSearchInput={userSearchInput}
                setUserSearchInput={setUserSearchInput}
              />
            }
          />
          <Route
            path="/userprofile/:id"
            element={<UserProfile users={users} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
