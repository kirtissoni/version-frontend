import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RepoDetail = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/${id}`);
        setRepo(res.data[0]);
      } catch (err) {
        setMessage("Error fetching repository");
      }
    };
    fetchRepo();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/repo/delete/${id}`);
      setMessage("Repository deleted successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage("Error deleting repository");
    }
  };

  if (!repo) return <div style={{ color: 'white' }}>Loading...</div>;

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <button onClick={handleDelete} style={{ color: 'red' }}>Delete Repository</button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default RepoDetail;
