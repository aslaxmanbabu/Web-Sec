// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register"; // Importing the Register component
import Login from "./pages/Login"; // Importing the Login component
import Header from "./components/Header"; // Importing the Header component

const App = () => {
  return (
    <Router>
      <Header /> {/* The header with navigation links */}
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Home />} /> {/* A default Home page route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

// A simple Home component as the default page
const Home = () => {
  return <h1>Welcome to the Home Page</h1>;
};

export default App;
