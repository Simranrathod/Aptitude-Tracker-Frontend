import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Userprofile.css";
export default function Userprofile() {
  const user = JSON.parse(localStorage.getItem("user"));
 

  return (
   <div className="profile-container">
  <div className="profile-card">

  <img
  src={
    user.profilePic ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png" }className="profile-pic"/>

    <h2>{user.name}</h2>
    <p className="email">{user.email}</p>

  

    <button className="profile-btn">Edit Profile</button>
    <button className="profile-btn">Change Password</button>
  </div>
</div>

  );
}
