import React from "react";
import "../Src/Practice.css"
import { useNavigate } from "react-router-dom";

export default function Practice() {
  const navigate = useNavigate();

  return (
    <div className="practice-page">
      <h2>Practice Sections</h2>
      <p>Select a difficulty level and start practicing.</p>

      <div className="practice-grid">

        {/* Easy */}
        <div onClick={() => navigate("/questions/easy")} className="practice-card easy-box">
          <h3>Easy Level</h3>
          <p>Start with basic level aptitude questions.</p>
        </div>

        {/* Medium */}
        <div onClick={() => navigate("/questions/medium")} className="practice-card medium-box">
          <h3>Medium Level</h3>
          <p>Practice moderately challenging questions.</p>
        </div>

        {/* Hard */}
        <div onClick={() => navigate("/questions/hard")} className="practice-card hard-box">
          <h3>Hard Level</h3>
          <p>Attempt the toughest problems to test your skills.</p>
        </div>

      </div>
    </div>
  );
}
