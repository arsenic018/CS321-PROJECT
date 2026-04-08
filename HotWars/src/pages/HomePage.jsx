import './HomePage.css';
import { User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const HomePage = () => {
    const nami = useNavigate();
    return (
        <div className="home-panel">
            <header className="home-header">
                <img src={logo} alt="Logo" className="logo-icon" />
                <h1 className="home-title">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" onClick={() => nami("/Login")} />
            </header>

            <main className="home-main">
                <div className="home-left">
                    <button className="home-btn home-btn-large" onClick={() => nami("/BuiltIn")}>Select & Play</button>
                </div>
                <div className="home-right">
                    <button className="home-btn home-btn-small" onClick={() => nami("/CreateSet")}>Create A Set</button>
                    <button className="home-btn home-btn-small" onClick={() => nami("/LoadSet")}>Load A Set</button>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
