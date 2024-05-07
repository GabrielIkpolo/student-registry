import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import "./headNav.css";
import logo from "../assets/react.svg";

const HeadNav = () => {
    return (
        <>
            <div className='navs'>
                <div className="logo">
                <img src={logo} alt="Logo" />
                </div>
                <div className='theLinks'>
                    <ul>
                        <li>
                            <NavLink className="navLink" to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="navLink" to="/manager">Manager</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>

    )
}

export default HeadNav