import './BuiltIn.css';
import './Play.jsx';
import './CreateSet.jsx';
import {User } from 'lucide-react';
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"

const BuiltIn = () => {
    return(
        <div className="startPanelll">
            <header className="startHeaderr">
                <h1 className="gameTitlee">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" />
            </header>
            <h1 className='builtInTitle'>Built in Sets</h1>
            <PlayButton/>
            <ValButton/>
            <TriviaButton/>
        </div>
        
    )
}
function PlayButton(){
    const nami = useNavigate();
    //Need to add fucntionaltiy that when user selects a prebuilt set and then user can start the game
    return (
        <div className="right-middle-buttonn">
        <button className="button-titleee" onClick={()=>nami("/Play")}>Play</button>
        </div>
    )
}

function ValButton(){
    //Need to add functionality that a user can select a built in valorant comms set 
    const nami = useNavigate();
    return (<div className="left-top-buttonn">
        <button className="button-titleee">Valorant Comms</button>
        </div>
    )
}
function TriviaButton(){
    //Need to add functionality that a user can select a built in trivia set 
    const nami = useNavigate();
    return (<div className="left-bottom-buttonn">
        <button className="button-titleee">Trivia</button>
        </div>
    )
}

export default BuiltIn