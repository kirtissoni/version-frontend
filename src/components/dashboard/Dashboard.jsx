import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );

        const data = await response.json();
        setRepositories(Array.isArray(data.repositories) ? data.repositories : []);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);

        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();

    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search.."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {Array.isArray(searchResults) && searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <Link to={`/repo/${repo._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <h4>{repo.name}</h4>
                  <h4>{repo.description}</h4>
                </Link>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>
            Upcoming events
            <ul>
              <li>
                <p>Tech Conference - Dec 15</p>
              </li>
              <li>
                <p>Developer Meetup - Dec 25</p>
              </li>
              <li>
                <p>React Summit - Jan 5</p>
              </li>
            </ul>
          </h3>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
