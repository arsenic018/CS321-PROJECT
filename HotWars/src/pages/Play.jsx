import { useState, useEffect, useRef } from "react";
import heart from "../assets/heart.svg";
import "./Play.css";
import { 
    useNavigate,
    useParams
} from "react-router-dom"; 

const TICK_MS = 50;
let nextId = 0;

const Play = () => {
    const [fallSpeed, setFallSpeed] = useState(0.4);
    const [spawnMS, setSpawnMS] = useState(8000);

    const fallSpeedRef = useRef(fallSpeed);
    const spawnMSRef = useRef(spawnMS);

    useEffect(() => { fallSpeedRef.current = fallSpeed }, [fallSpeed]);
    useEffect(() => { spawnMSRef.current = spawnMS }, [spawnMS]);

    const [answer, setAnswer] = useState("");
    const [words, setWords] = useState([]);
    const [hearts, setHearts] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const droppedWords = useRef(new Set());
    const [questions, setQuestions] = useState([]);

    const nami = useNavigate();
    const { gamemode } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/trivia")
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(err => console.log(err));
    }, [gamemode]);

    // SPAWN INTERVAL — now uses ref, not spawnMS dependency
    useEffect(() => {
        if (questions.length === 0) return;

        const spawn = setInterval(() => {
            const q = questions[Math.floor(Math.random() * questions.length)];
            const x = Math.random() * 90;
            setWords(prev => [...prev, { id: nextId++, question: q.Question, answer: q.Answer, x, y: 0 }]);
        }, spawnMSRef.current);

        return () => clearInterval(spawn);
    }, [questions]);

    // FALLING TICK — now uses ref, no fallSpeed dependency
    useEffect(() => {
        const tick = setInterval(() => {
            setWords(prev => {
                let newlyDropped = 0;

                const updated = prev
                    .map(w => ({ ...w, y: w.y + fallSpeedRef.current }))
                    .filter(w => {
                        if (w.y >= 100) {
                            if (!droppedWords.current.has(w.id)) {
                                droppedWords.current.add(w.id);
                                newlyDropped++;
                            }
                            return false;
                        }
                        return true;
                    });

                if (newlyDropped > 0) {
                    setHearts(h => Math.max(0, h - newlyDropped));
                }

                return updated;
            });
        }, TICK_MS);

        return () => clearInterval(tick);
    }, []);

    const updateSpeed = () => {
        if (fallSpeed != .8) {
            setFallSpeed(fallSpeed + 0.04);
            setSpawnMS(spawnMS - 400);
        }
    };

    const resetSpeed = () => {
        setFallSpeed(0.8);
        setSpawnMS(8000);
    };

    const handleInput = (e) => {
        const val = e.target.value;
        const match = words.find(w => w.answer.toLowerCase() === val.toLowerCase().trim());

        if (match) {
            setWords(prev => prev.filter(w => w.id !== match.id));
            setScore(prev => prev + 1);
            setAnswer("");
            updateSpeed();
        } else {
            setAnswer(val);
        }
    };

    useEffect(() => {
        if (hearts <= 0) {
            setGameOver(true);
        }
    }, [hearts]);

    if (hearts <= 0) {
        resetSpeed();
        
        return (
            <div className="play-panel">
                <h1 className="game-over">GAME OVER</h1>
                <p className="score-final">Final score: {score}</p>
                <div className="buttons-container">
                    <button className="quit-button" onClick={() => nami("/HomePage")}>Quit</button>
                    <button className="play-again-button" onClick={() =>  nami("/BuiltIn") }>
                        Play again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="play-panel">
            <header className="play-header">
                <div className="health-container">
                    {Array.from({ length: hearts }).map((_, i) => (
                        <img key={i} src={heart} className="heart" />
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
