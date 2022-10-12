import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import Collection from "./components/Collection/Collection";
import SearchSpotify from "./components/SearchSpotify/SearchSpotify";
import ArtistsAlbums from "./components/ArtistsAlbums/ArtistsAlbums";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchLastfm from "./components/SearchLastfm/SearchLastfm";
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
          <Route
            path="/searchspotify"
            element={
              <SearchSpotify
                collection={collection}
                setCollection={setCollection}
              />
            }
          />
          <Route path="/searchrecordstoadd" element={<SearchLastfm />} />
        </Routes>
        <Users />
      </BrowserRouter>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
