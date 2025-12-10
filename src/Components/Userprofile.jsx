import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Userprofile.css";

export default function Userprofile() {
  const localUser = JSON.parse(localStorage.getItem("user"));  
  const [user, setUser] = useState(null);
console.log(user);
  useEffect(() => {
    if (!localUser?._id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://aptitude-tracker-backend1-3.onrender.com/User/user/${localUser._id}`);
        setUser(res.data); // backend se fresh data
      } catch (err) {
        console.log("Error fetching user data", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          className="profile-pic"
        />

        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>
        <p className="joined-date">
          Joined on: {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <p className="stats">
          Total Tests: {user.totalTests}
        </p>

      </div>
    </div>
  );
}
