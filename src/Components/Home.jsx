import React, { useEffect, useState } from "react";
import "../Src/Home.css";
// import Signup from "./Signup";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Signupmain from "./Signupmain";
export default function Home() {

   const [showSignup, setShowSignup] = useState(false);
  const navigate=useNavigate()
   useEffect(()=>{
    const timer=setTimeout(() => {
      const isSignedup=localStorage.getItem("userSignedUp")
       const popupClosedAt = localStorage.getItem("popupClosedAt");
       if (isSignedup) return;
       if (popupClosedAt) {
        const closedTime = parseInt(popupClosedAt);
        const now = Date.now();

       
      }
            setShowSignup(true);

    }, 2000);
  
    return ()=>clearTimeout(timer)
   },[])
    const closePopup = () => {
    setShowSignup(false);
    localStorage.setItem("popupClosedAt", Date.now().toString());
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h2>Sharpen Your Aptitude Skills</h2>
        <p>Track your progress, practice daily, and be placement-ready.</p>
        <div className="hero-btns">
          <button className="primary-btn">Start Practicing</button>
          <button className="secondary-btn">View Status</button>
        </div>
      </section>

      {/* Why Choose Section (New) */}
      <section className="why-choose">
        <h3>Why Choose Aptitude Tracker?</h3>
        <div className="features">
          <div className="feature-card">
            <h4>📈 Track Your Progress</h4>
            <p>Get detailed performance insights and improve over time.</p>
          </div>
          <div className="feature-card">
            <h4>🧠 Topic-Wise Practice</h4>
            <p>Focus on specific areas like Quantitative, Verbal, or Logical.</p>
          </div>
          <div className="feature-card">
            <h4>🏆 Compete & Grow</h4>
            <p>Check your position on the leaderboard and stay motivated.</p>
          </div>
        </div>
      </section>

     
     <section className="difficulty-section">
  <h3>Choose Your Difficulty Level</h3>
  <div className="difficulty-grid">
    <div onClick={()=>navigate("/questions/easy")} className="difficulty-card easy">
      <h4> Easy Level</h4>
      <p>Start your journey with simple aptitude problems to build your basics strong.</p>
      <button className="level-btn">Start Easy</button>
    </div>

    <div  onClick={()=>navigate("/questions/medium")} className="difficulty-card medium">
      <h4>Medium Level</h4>
      <p>Challenge yourself with moderate problems and improve your problem-solving speed.</p>
      <button className="level-btn">Try Medium</button>
    </div>

    <div  onClick={()=>navigate("/questions/hard")} className="difficulty-card hard">
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
        <div className="popup-overlay"  onClick={closePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <button className="close-popup" onClick={closePopup}>
             <RxCross2 />
            </button>
            {/* <Signup /> */}
            <Signupmain/>
          </div>
        </div>
      )}
    </div>
  );
}
