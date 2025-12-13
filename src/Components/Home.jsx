import React, { useEffect, useState } from "react";
import "../Src/Home.css";
// import Signup from "./Signup";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Signupmain from "./Signupmain";
export default function Home() {

  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      const isSignedup = localStorage.getItem("userSignedUp")

      if (isSignedup) return;

      setShowSignup(true);

    }, 2000);

    return () => clearTimeout(timer)
  }, [])
  const closePopup = () => {
    setShowSignup(false);

  };

  return (
    <div className="home-page">

      <section className="hero">
        <h2>Sharpen Your Aptitude Skills</h2>
        <p>Track your progress, practice daily, and be placement-ready.</p>
        <div className="hero-btns">
          <button className="primary-btn" onClick={() => navigate("/practice")}>Start Practicing</button>
          <button className="secondary-btn" onClick={() => navigate("/my-scores")}>View Status</button>
        </div>
      </section>

      <section className="why-choose">
        <h3>Why Choose Aptitude Tracker?</h3>
        <div className="features">
          <div className="feature-card">
            <h4>Level-Based Learning</h4>
            <p>Start from easy questions and gradually unlock harder levels as you improve.</p>
          </div>



          <div className="feature-card">
            <h4>Daily Progress Tracking</h4>
            <p>Check your score history and see how much you grow each day.</p>
          </div>

          <div className="feature-card">
            <h4>Leaderboard for Motivation</h4>
            <p>Compete with other users and climb to the top based on your performance.</p>
          </div>
        </div>
      </section>


      <section className="difficulty-section">
        <h3>Choose Your Difficulty Level</h3>
        <div className="difficulty-grid">
          <div onClick={() => navigate("/questions/easy")} className="difficulty-card easy">
            <h4> Easy Level</h4>
            <p>Start your journey with simple aptitude problems to build your basics strong.</p>
            <button className="level-btn">Start Easy</button>
          </div>

          <div onClick={() => navigate("/questions/medium")} className="difficulty-card medium">
            <h4>Medium Level</h4>
            <p>Challenge yourself with moderate problems and improve your problem-solving speed.</p>
            <button className="level-btn">Try Medium</button>
          </div>

          <div onClick={() => navigate("/questions/hard")} className="difficulty-card hard">
            <h4> Hard Level</h4>
            <p>Test your skills with advanced and tricky aptitude questions to master your concepts.</p>
            <button className="level-btn">Go Hard</button>
          </div>
        </div>
      </section>



      <footer className="footer">
        <p>© 2025 Aptitude Tracker | All Rights Reserved</p>
      </footer>

      {showSignup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-popup" onClick={closePopup}>
              <RxCross2 />
            </button>
            {/* <Signup /> */}
            <Signupmain />
          </div>
        </div>
      )}
    </div>
  );
}
