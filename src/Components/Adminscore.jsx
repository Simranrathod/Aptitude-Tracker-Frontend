import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Adminscore.css";
export default function AdminScores() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));

                const res = await axios.get("http://localhost:8089/score/all-scores");
                setScores(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <div className="admin-scores">
            <h2>All Scores</h2>
            <table>
                <thead>
                    <tr><th>User</th><th>Level</th><th>Score</th><th>Total</th><th>Date</th></tr>
                </thead>
                <tbody>
                    {scores.map(s => (
                        <tr key={s._id}>
                            {/* <td>{s.userId?.name || "Unknown"}</td> */}

                            {/* <td>{s.userId?.name || "Unknown"}</td> */}

                          <td>{s.userId?.name || s.name}</td>

                            <td>{s.level}</td>
                            <td>{s.score}</td>
                            <td>{s.total}</td>
                            <td>{new Date(s.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
