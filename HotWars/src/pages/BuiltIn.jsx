import './BuiltIn.css';
import { User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const BuiltIn = () => {
    const nami = useNavigate();
    return (
        <div className="builtin-panel">
            <header className="builtin-header">
                <img src={logo} alt="Logo" className="logo-icon" />
                <h1 className="builtin-title">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" onClick={() => nami("/Login")} />
            </header>

            <h2 className="builtin-subtitle">Built In Sets</h2>

            <main className="builtin-main">
                <div className="builtin-left">
                    <button className="builtin-btn builtin-btn-small">Valorant Comms</button>
                    <button className="builtin-btn builtin-btn-small">Trivia</button>
                </div>
                <div className="builtin-right">
                    <button className="builtin-btn builtin-btn-large" onClick={() => nami("/Play")}>Play</button>
                </div>
            </main>
        </div>
    );
};

export default BuiltIn;
