import React from 'react'
import "./protectedRoute.css"
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthContext} from "../context/AuthContext.jsx";

const ProtectedRoute = ({role, children}) => {
    const {token, user} = useContext(AuthContext);

    if(!token || !user){
        return <Navigate to="/" replace />
    }

    // console.log("This is the UserRole:", user.role, "And The", user.user.role); 

    if(!role.includes(user.user.role)){
        return <p>Unauthorized: Insufficient Permission</p>;
    }
    
    return children;
}

export default ProtectedRoute