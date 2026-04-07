import React, { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import heart from '../assets/heart.svg';
import './Play.css';
const Play = () => {
    const [answer, setAnswer] = useState(""); // This will hold user Answer
    const [score, setScore] = useState(0); // This will hold user Score
    const [health, setHealth] = useState(3); // Start with 3 hearts
    // FUTURE: Add a way to get questions from the loaded set the user provides. 
    // I'm not sure what the best way to do this is yet, but I know we need to do it.

    // Textbox handler
    const handleAnswer = (event) => {
        setAnswer(event.target.value); // Accesses the current text
    };
    // When we figure out how to retrieve the set of answers, we should add a handler
    // that checks if the user's answer is correct.

    return (
        <div className="startPanel">

            <header className="startHeader">
                <h1 className="gameTitle">HOT WARS!</h1>
            </header>
            <div className="healthContainer">
                <img src={heart} className="heart" alt="Heart" />
                <img src={heart} className="heart" alt="Heart" />
                <img src={heart} className="heart" alt="Heart" />
            </div>
            <div className="scoreContainer">
                <p className="scoreText"> Score: {score}</p>
            </div>


            <Box display="flex" justifyContent="center" alignItems="center" >
                <TextField id="filled-basic" label="Enter Answer" variant="filled"
                    sx={{ backgroundColor: "white" }} />
            </Box>



        </div>
    )
}

export default Play
