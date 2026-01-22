import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";

const StarredRepositories = () => {
  const [starredRepos, setStarredRepos] = useState([
    {
      _id: 1,
      name: "demo-repo",
      description: "Sample starred repository",
    },
    {
      _id: 2,
      name: "project-alpha",
      description: "Another starred repo",
    },
  ]);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        // 👉 agar backend ready hai
        const response = await axios.get(
          `http://localhost:3002/starred/${userId}`
        );
        setStarredRepos(response.data);
      } catch (err) {
        console.error("Error fetching starred repos:", err);
      }
    };

    fetchStarredRepos();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", color: "white" }}>
        <h2>Starred Repositories</h2>

        {starredRepos.length === 0 ? (
          <p>No starred repositories yet</p>
        ) : (
          starredRepos.map((repo) => (
            <div
              key={repo._id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #2f353d",
              }}
            >
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default StarredRepositories;
