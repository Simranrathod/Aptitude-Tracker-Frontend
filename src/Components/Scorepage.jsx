import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Src/Scorepage.css";
export default function ScorePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // if user landed here directly, go back or fetch last score from backend
    return (
      <div className="score-page">
        <h2>No score found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const { score, total, level,userId,name} = state;

  return (
    <div className="score-page">
      <h2>Test Completed</h2>
      <p>Level: {level}</p>
      <p>Name: {name}</p>
      <p>UserId: {userId}</p>
      <h3>Your Score: {score} / {total}</h3>
      <p>{Math.round((score / total) * 100)}% </p>

    </div>
  );
}
