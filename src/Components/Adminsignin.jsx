import React, { useState } from "react";
import "../Src/Signin.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "./UseAuth";

function Adminsignin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const {login}=useAuth()

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://aptitude-tracker-backend1-3.onrender.com/admin/adminsignin", {
        email,
        password,
      });
      // eneconsole.log(response.data);
      const token=response.data.token 
      localStorage.setItem('admintoken',token)
      console.log(token);
      if (response.status === 200) {
        alert("Login successful");
        navigate("/admindashboard"); 
        // login(token)
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Login failed!");
      } else {
        alert("Server not reachable!");
      }
      console.error(err);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handlelogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>

         
        </form>
      </div>
    </div>
  );
}

export default  Adminsignin;
