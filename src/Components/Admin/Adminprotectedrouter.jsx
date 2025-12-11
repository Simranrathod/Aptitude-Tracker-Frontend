import React from 'react'
import { Navigate } from 'react-router-dom'
function Adminprotectedrouter({children}) {
    const admin=JSON.parse(localStorage.getItem("admintoken"))
 if(!admin)
 {
    return <Navigate to="/admin"/>
 }
 return children;
}

export default Adminprotectedrouter