import React from "react";
import { useNavigate } from "react-router-dom";
import "../Src/Admindashboard.css";

export default function Admindashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-options">

        <button onClick={() => navigate("/admin/users")} className="dash-btn">
          👥 View Registered Users
        </button>

        <button onClick={() => navigate("/adminquestion")} className="dash-btn">
          📝 Manage Questions
        </button>
        <button onClick={() => navigate("/adminscore")} className="dash-btn">
          📝Scores
        </button>

      </div>
    </div>
  );
}
