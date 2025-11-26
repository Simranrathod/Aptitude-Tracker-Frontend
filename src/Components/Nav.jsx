import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import "../Src/Nav.css";

export default function Nav() {
  const [hambar, sethambar] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <header className="navbar">
        <div className="nav-left">
          <button onClick={() => sethambar(true)} className="hamburger-btn">
            <GiHamburgerMenu />
          </button>
          <h1 className="logo">Aptitude Tracker</h1>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/about">About</Link>
          <Link to="/signin" className="login-btn">
            Login
          </Link>
        </nav>
      </header>

      <div className={`sidebar ${hambar ? "open" : ""}`}>
        <button className="close-btn" onClick={() => sethambar(false)}>
          <ImCross />
        </button>

        <h2>Menu</h2>
        <button onClick={() => navigate("/user-profile")}>👤 Profile</button>
        <button onClick={() => navigate("/my-scores")}>🏆 My Score</button>
        <button>🧠 Practice Tests</button>
        <button>📊 My Progress</button>
        <button>🏅 Leaderboard</button>
        <button>❓ Help</button>
        <button>⚙️ Settings</button>
        <button className="logout-btn">🚪 Logout</button>
      </div>

      {hambar && <div className="overlay" onClick={() => sethambar(false)}></div>}
    </>
  );
}
