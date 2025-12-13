import React, { useState } from "react";
import "../Src/Signupmain.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signupmain() {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlechange = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(email);
    console.log(name);

    try {
      const response = await axios.post("https://aptitude-tracker-backend1-3.onrender.com/User/signup", {
        name,
        email,
        password,
      });
      console.log(response.status);

      if (response.status === 200) {
        localStorage.setItem("userSignedUp", "true");
        navigate("/signin");
       

      }

    } catch (err) {
      console.error(err);
      alert("Error during signup. Please try again.");
    }
  };

  return (


   



      <div className="signup-box">
        <h2>Create Account</h2>
        <form onSubmit={handlechange}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          {/* <p className="signin-link">
            Already have an account? <a href="/Signin">Sign in</a>
          </p> */}
          <p className="signin-link">
            Already have an account? <Link className="link-signin" to="/Signin">Sign in</Link>
          </p>
        </form>
      </div>

  );
}

export default  Signupmain; 
