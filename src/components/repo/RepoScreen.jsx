import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RepoScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateRepo = async (e) => {
    e.preventDefault();
    const owner = localStorage.getItem("userId");
    if (!owner) {
      setMessage("User not logged in");
      return;
    }
    if (!name) {
      setMessage("Repository name is required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3002/repo/create", {
        name,
        description,
        owner,
      });
      setMessage("Repository created successfully!");
      setName("");
      setDescription("");
      setTimeout(() => {
        navigate("/");
      }, 1000); // 1 second delay to show success message
    } catch (err) {
      setMessage("Error creating repository");
    }
  };

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>Create Repository</h2>
      <form onSubmit={handleCreateRepo} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Create</button>
      </form>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default RepoScreen;
