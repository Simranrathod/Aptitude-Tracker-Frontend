import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Myscore.css";
export default function MyScores() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:8089/score/my-scores/${user._id}`)
      .then(res => setScores(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!user) {
    return <h2>Please Login First</h2>;
  }

  return (
    <div className="my-score-page">
      <h2>My Test History</h2>

      {scores.length === 0 ? (
        <p>No tests taken yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>Score</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>
            {scores.map((s, i) => (
              <tr key={i}>
                <td>{new Date(s.date).toLocaleString()}</td>
                <td>{s.level}</td>
                <td>{s.score}</td>
                <td>{s.total}</td>
                <td>{Math.round((s.score / s.total) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
