import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Login.css";

const Login = () => {
    const nami = useNavigate();

    return (
        <div className="login-panel">
            <header className="login-header">
                <img src={logo} alt="Logo" className="logo-icon" />
                <h1 className="login-title">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" />
            </header>

            <div className="login-form">
                <div className="login-input-wrapper">
                    <input className="login-input" type="text" placeholder="Username" />
                </div>
                <div className="login-input-wrapper">
                    <input className="login-input" type="password" placeholder="Password" />
                </div>
                <div className="login-button-wrapper">
                    <button className="login-button" onClick={() => nami("/HomePage")}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
