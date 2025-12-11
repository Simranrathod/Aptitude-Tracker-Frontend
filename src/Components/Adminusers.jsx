import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Adminusers.css";

export default function Adminusers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {


      const res = await axios.get("https://aptitude-tracker-backend1-3.onrender.com/admin/all-users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
          },
        });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("admintoken");
        window.location.href = "/admin-login";
      }
    }
  }



  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>All Registered Users</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
