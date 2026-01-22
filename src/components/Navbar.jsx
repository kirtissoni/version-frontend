import React from "react";
import { Link } from "react-router-dom";
import githubLogo from "../assets/github-mark-white.svg";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
          <h3>Github</h3>
        </div>
      </Link>

      <div>
        <Link to="/create">
          <p>Create a repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
