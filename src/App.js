import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";

// import data from "./components/data.json";
import React, { useEffect, useMemo, useState } from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Edit2 from "./components/Edit2";
import Body from "./components/Body";
import MovieDetail from "./components/MovieDetail";

export const UserContent = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContent.Provider value={{ setUser, user }}>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/:id" element={<Body />} />
          <Route path="/" element={<Body />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} /> // định nghĩa path
          <Route path="/edit" element={<Edit />} /> // định nghĩa path
          <Route path="/edit/:id" element={<Edit2 />} /> // định nghĩa path
        </Routes>

      </div>
    </Router>
    </UserContent.Provider>
  );
}

export default App;
