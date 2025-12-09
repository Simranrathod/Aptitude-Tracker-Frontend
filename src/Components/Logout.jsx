import React from "react";
import "../Src/Logout.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Signin");  // logout ke baad signin page
  };

  const handleCancel = () => {
    navigate("/");   // cancel par home page
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>Are you sure you want to logout?</h2>

        <div className="logout-buttons">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
