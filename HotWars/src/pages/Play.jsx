import { useState, useEffect } from "react";
import heart from "../assets/heart.svg";
import "./Play.css";



const FALL_SPEED = 0.4;
const TICK_MS = 50;
const SPAWN_MS = 2000;

let nextId = 0;

const Play = () => {
    const [answer, setAnswer] = useState("");
    const [words, setWords] = useState([]);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/trivia")
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const spawn = setInterval(() => {
            const q = questions[Math.floor(Math.random() * questions.length)];
            // console.log("spawning question:", q);
            const x = Math.random() * 75 + 5;
            setWords(prev => [...prev, { id: nextId++, question: q.Question,answer: q.Answer, x, y: 10 }]);
        }, SPAWN_MS);
        return () => clearInterval(spawn);
    }, [questions]);

    useEffect(() => {
        const tick = setInterval(() => {
            setWords(prev => prev.map(w => ({ ...w, y: w.y + FALL_SPEED })));
        }, TICK_MS);
        return () => clearInterval(tick);
    }, []);

    const handleInput = (e) => {
        const val = e.target.value;
        const match = words.find(w => w.answer.toLowerCase() === val.toLowerCase().trim());
        if (match) {
            setWords(prev => prev.filter(w => w.id !== match.id));
            setAnswer("");
        } else {
            setAnswer(val);
        }
    };

    return (
        <div className="play-panel">
            <header className="play-header">
                <div className="health-container">
                    <img src={heart} className="heart" alt="Heart" />
                    <img src={heart} className="heart" alt="Heart" />
                    <img src={heart} className="heart" alt="Heart" />
                </div>
                <h1 className="play-title">HOT WARS!</h1>
                <div className="score-container">
                    <p className="score-text">Score: 0</p>
                </div>
            </header>

            <div className="play-field">
                {words.map(w => (
                    <span
                        key={w.id}
                        className="falling-word"
                        style={{ left: `${w.x}%`, top: `${w.y}%` }}
                    >
                        {w.question}
                    </span>
                ))}
            </div>

            <div className="play-input-bar">
                <input
                    className="play-input"
                    type="text"
                    value={answer}
                    onChange={handleInput}
                    placeholder="Type a word..."
                    autoFocus
                />
            </div>
        </div>
    );
};

export default Play;
