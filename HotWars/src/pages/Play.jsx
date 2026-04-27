import { useState, useEffect, useRef } from "react";
import heart from "../assets/heart.svg";
import "./Play.css";

const WORDS = [
    "react", "vite", "router", "state", "effect",
    "render", "component", "props", "hook", "context"
];

const FALL_SPEED = 0.8;
const TICK_MS = 50;
const SPAWN_MS = 2000;

let nextId = 0;

const Play = () => {
    const [answer, setAnswer] = useState("");
    const [words, setWords] = useState([]);
    const [hearts, setHearts] = useState(3); // Start w/ 3 hearts, Decrement when word falls completely down
    const [score, setScore] = useState(0); // Start w/ 0 score, Increment when word is typed
    const droppedWords = useRef(new Set()); // Keep track of words that have been dropped

    useEffect(() => {
        const spawn = setInterval(() => {
            const word = WORDS[Math.floor(Math.random() * WORDS.length)]; // Randomly select a word from the list
            const x = Math.random() * 75 + 5; // Randomly select a x position for the word
            setWords(prev => [...prev, { id: nextId++, word, x, y: 0 }]); // Add word to the list
        }, SPAWN_MS);
        return () => clearInterval(spawn);
    }, []);

    useEffect(() => {
        const tick = setInterval(() => {
            setWords(prev => {
                let newlyDropped = 0;
                const updated = prev
                    .map(w => ({ ...w, y: w.y + FALL_SPEED })) // Updates y position of each word
                    .filter(w => {
                        if (w.y >= 100) { // Check if word has reached the bottom
                            if (!droppedWords.current.has(w.id)) { // Check if the word is currently dropping
                                droppedWords.current.add(w.id);
                                newlyDropped++;
                            }
                            return false;
                        }
                        return true;
                    });

                if (newlyDropped > 0) { // Update hearts after filtering
                    setHearts(h => Math.max(0, h - newlyDropped));
                }
                return updated;
            });
        }, TICK_MS);
        return () => clearInterval(tick);
    }, []);

    const handleInput = (e) => {
        const val = e.target.value;
        const match = words.find(w => w.word.toLowerCase() === val.toLowerCase().trim()); // Boolean check if word is typed
        if (match) {
            setWords(prev => prev.filter(w => w.id !== match.id));
            setScore(prev => prev + 1); // Increment score by one
            setAnswer("");
        } else {
            setAnswer(val);
        }
    };

    if (hearts <= 0) { // Check if hearts are less than or equal to 0
        return ( // TEMPORARY GAME OVER SCREEN PLEASE MAKE IT BETTER
            <div className="play-panel">
                <h1>GAME OVER</h1>
            </div>
        );
    }

    return (
        <div className="play-panel">
            <header className="play-header">
                <div className="health-container">
                    {Array.from({ length: hearts }).map((_) => (
                        <img src={heart} className="heart" />
                    ))}
                </div>
                <h1 className="play-title">HOT WARS!</h1>
                <div className="score-container">
                    <p className="score-text">Score: {score}</p>
                </div>
            </header>

            <div className="play-field">
                {words.map(w => (
                    <span
                        key={w.id}
                        className="falling-word"
                        style={{ left: `${w.x}%`, top: `${w.y}%` }}
                    >
                        {w.word}
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
