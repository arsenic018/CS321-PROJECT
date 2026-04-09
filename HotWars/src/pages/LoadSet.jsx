import React from "react"
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"
import './LoadSet.css';
const LoadSet = () => {
    const navigate = useNavigate();

    const handleLoadSet = () => {
        // TODO: Finish making the UI look sexy. Don't worry about the files for now.
    };

    return(
       <div className="startPanel">
            <header className="startHeader">
                <h1 className="gameTitle">HOT WARS!</h1>                
            </header>
            <LoadButton onClick={handleLoadSet} onPlay={() => navigate("/Play")} />
        </div>
        
    )
}

function LoadButton({ onClick, onPlay })
{
    return (
        <>
            <button className="load-set-button" onClick={onClick}>Load File</button>
            <button className="load-play-button" onClick={onPlay}>Play</button>
        </>
    );
}
// function PlayButton(){
//     return (
//         <div className="left-middle-button">
//         <button className="button-title">Play</button>
//         </div>
//     )
// }
// function CreateButton(){
//     return (<div className="right-top-button">
//         <button className="button-title">Create A Set</button>
//         </div>
//     )
// }
// function LoadButton(){
//     return (<div className="right-bottom-button">
//         <button className="button-title">Load A Set</button>
//         </div>
//     )
// }

export default LoadSet