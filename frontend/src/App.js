import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Collection from "./components/Collection/Collection";
import SearchSpotify from "./components/SearchSpotify/SearchSpotify";
import ArtistsAlbums from "./components/ArtistsAlbums/ArtistsAlbums";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchLastfm from "./components/SearchLastfm/SearchLastfm";
import UserProfile from "./components/UserProfile/UserProfile";
import SearchUsers from "./components/SearchUsers/SearchUsers";
import "./App.css";
import Users from "./components/Users/Users";

// const artistCardStyle = {
//   height: "400px",
//   width: " 400px",
//   border: "1px solid grey",
//   borderRadius: "5px",
//   textAlign: "center",
//   display: "block",
// };

function App() {
  const [collection, setCollection] = useState(null);
  const [users, setUsers] = useState(null);
  const USERS_API = "http://localhost:5000/api/users/";

  const getUsers = async () => {
    const response = await axios.get(USERS_API);
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  // const fetchRecordColelction = () => {
  //   fetch("http://localhost:5000/api/vinylcollection")
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log(response);
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .then((data) => {
  //       setCollection(data); // array of albums
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(fetchRecordColelction, []);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/:id"
            element={<ArtistsAlbums collection={collection} />}
          />
          <Route path="users/:id" element={<UserProfile users={users} />} />
          <Route path="/searchrecordstoadd" element={<SearchLastfm />} />
          <Route path="/searchusers" element={<SearchUsers users={users} />} />
        </Routes>
        {/* <Users users={users} /> */}
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
