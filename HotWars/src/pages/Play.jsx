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
    const setName = window.location.pathname.split("/")[2];

    useEffect(() => {
        fetch(`http://localhost:5000/${setName}`)
            .then(res => res.json())
            .then(data => {
                console.log("Sample item:", data[0]);
                setQuestions(data);
            })
            .catch(err => console.log(err));
    }, [gamemode]);

    useEffect(() => {
        if (questions.length === 0) return;

        const spawnTimeoutRef = { current: null };

        const spawn = () => {
            const q = questions[Math.floor(Math.random() * questions.length)];
            const imageWidthVw = (600 / window.innerWidth) * 100;
            const x = setName === "valorant" ? Math.random() * (100 - imageWidthVw) : Math.random() * 90;

            setWords(prev => [...prev, {
                id: nextId++,
                question: setName === "valorant" ? null : q.Question,
                image: setName === "valorant" ? q.Question : null,
                answer: q.Answer,
                x,
                y: 0
            }]);
            spawnTimeoutRef.current = setTimeout(spawn, spawnMSRef.current);
        };

        spawnTimeoutRef.current = setTimeout(spawn, spawnMSRef.current);
        return () => clearTimeout(spawnTimeoutRef.current);
    }, [questions]);

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
        if (spawnMS > 2000 ) {
            setFallSpeed(prev => prev + 0.04);
            setSpawnMS(prev => prev - 400);
        }
    };

    const resetSpeed = () => {
        setFallSpeed(0.4);
        setSpawnMS(8000);
        fallSpeedRef.current = 0.4;
        spawnMSRef.current = 8000;
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
            resetSpeed();
            setGameOver(true);
        }
    }, [hearts]);

    if (hearts <= 0) {
        
        
        return (
            <div className="play-panel">
                <h1 className="game-over">GAME OVER</h1>
                <p className="score-final">Final score: {score}</p>
                <div className="buttons-container">
                    <button className="quit-button" onClick={() => nami("/HomePage")}>Quit</button>
                    <button className="play-again-button" onClick={() => nami("/BuiltIn")}>
                        Play Again
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
                        {setName === "valorant"
                            ? <img src={`data:image/png;base64,${w.image}`} className="falling-image" />
                            : w.question
                        }
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