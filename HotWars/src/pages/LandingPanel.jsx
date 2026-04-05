import React, { useEffect } from 'react';
import { Flame, User } from 'lucide-react';
import './LandingPanel.css';
import logo from '../assets/logo.png'
const LandingPanel = ({ onContinue }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            onContinue();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onContinue]);

    return (
        <div className="landing-panel" onClick={onContinue}>
            <header className="landing-header">
                <img src={logo} alt="Logo" className="logo-icon" />
                <h1 className="game-title">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" />
            </header>

            <main className="landing-main">
                <p className="pulse-text">Press any button to continue</p>
            </main>
        </div>
    );
};

export default LandingPanel;
