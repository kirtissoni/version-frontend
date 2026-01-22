import React, { useState, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

//Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import StarredRepositories from "./components/repo/StarredRepositories";
import RepoScreen from "./components/repo/RepoScreen";
import EditRepoScreen from "./components/repo/EditRepoScreen";
import RepoDetail from "./components/repo/RepoDetail";

//Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    //restore session
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }


    // Always redirect to login if not logged in (even after server restart)
    if (!userIdFromStorage && window.location.pathname !== "/login") {
      navigate("/login");
    }

    //logged-in user should not see login page
    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: currentUser ? <Dashboard /> : <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: currentUser ? <Profile /> : <Signup />,
    },
    {
      path: "/repo",
      element: currentUser ? <StarredRepositories /> : <Signup />,
    },
    {
      path: "/create",
      element: currentUser ? <RepoScreen /> : <Signup />,
    },
    {
      path: "/edit/:id",
      element: currentUser ? <EditRepoScreen /> : <Signup />,
    },
    {
      path: "/repo/:id",
      element: currentUser ? <RepoDetail /> : <Signup />,
    },
  ]);
  return element;
};

export default ProjectRoutes;
