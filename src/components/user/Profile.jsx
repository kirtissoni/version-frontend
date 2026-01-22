import HeatMapProfile from "./HeatMapProfile";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import userAvatar from "../../assets/profile.jpg";
import { useAuth } from "../../authContext";

const Profile = () => {
  const Navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:3002/userProfile/${userId}`
        );
        setUserDetails(response.data);
      } catch (err) {
        console.error("Error while fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <UnderlineNav aria-label="Repository">
        <UnderlineNav.Item
          aria-current="page"
          icon={BookIcon}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            "&:hover": {
              textDecoration: "white",
            },
          }}
        >
          Overview
        </UnderlineNav.Item>

        <UnderlineNav.Item
          onClick={() => Navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underLine",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
      </UnderlineNav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/signup";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image">
            <img src={userAvatar} alt="User" />
          </div>

          <div className="name">
            <h3>{userDetails?.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Followers</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
