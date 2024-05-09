import React, { createContext, useState, useContext, useEffect } from 'react'


export const AuthContext = createContext({
    token: null,
    setToken: () => { },
    user: null,
    setUser: () => { },
    handleLogin: () => { },
    handleLogout: ()=>{},
});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("userData") || null));

    
    const handleLogin = (newToken, userData)=>{
        setToken(newToken);
        setUser(userData);
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("userdata", JSON.stringify(userData));
    }

    const handleLogout = ()=>{
        setToken(null);
        setUser(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userData");
    }

    const value = { token, user, handleLogin, handleLogout, };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext