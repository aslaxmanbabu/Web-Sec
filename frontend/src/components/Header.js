// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom"; // Link component from react-router-dom to handle navigation

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
