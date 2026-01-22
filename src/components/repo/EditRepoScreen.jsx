import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditRepoScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch repo details for editing
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/${id}`);
        const repo = res.data[0];
        setName(repo.name);
        setDescription(repo.description);
      } catch (err) {
        setMessage("Error fetching repository");
      }
    };
    fetchRepo();
  }, [id]);

  const handleUpdateRepo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/repo/update/${id}`, {
        description,
      });
      setMessage("Repository updated successfully!");
      // Optionally redirect
      // navigate("/repo");
    } catch (err) {
      setMessage("Error updating repository");
    }
  };

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>Edit Repository</h2>
      <form onSubmit={handleUpdateRepo} style={{ marginTop: 20 }}>
        <input
          type="text"
          value={name}
          disabled
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Update</button>
      </form>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default EditRepoScreen;
