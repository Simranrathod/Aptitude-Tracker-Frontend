import React from "react";
import "../Src/Home.css";

export default function Home() {
  return (
    <div className="home-page">
    
      {/* <header className="navbar">
        <h1 className="logo">Aptitude Tracker</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Practice</a>
          <a href="#">Leaderboard</a>
          <a href="#">About</a>
          <button className="login-btn">Login</button>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="hero">
        <h2>Sharpen Your Aptitude Skills 🚀</h2>
        <p>Track your progress, practice daily, and be placement-ready.</p>
        <div className="hero-btns">
          <button className="primary-btn">Start Practicing</button>
          <button className="secondary-btn">View Stats</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h3>Explore Aptitude Topics</h3>
        <div className="category-grid">
          <div className="category-card">Quantitative</div>
          <div className="category-card">Logical Reasoning</div>
          <div className="category-card">Verbal Ability</div>
          <div className="category-card">Data Interpretation</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Aptitude Tracker | Made with ❤️ by Simran Rathod</p>
      </footer>
    </div>
  );
}
