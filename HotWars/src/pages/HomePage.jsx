import React from "react"
import './HomePage.css';
import './Play.jsx';
import './CreateSet.jsx';
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"

const HomePage = () => {
    return(
        <div className="startPanell">
            <header className="startHeader">
                <h1 className="gameTitle">HOT WARS!</h1>
            </header>
            <PlayButton/>
            <CreateButton/>
            <LoadButton/>
        </div>
        
    )
}
function PlayButton(){
    const nami = useNavigate();
    return (
        <div className="left-middle-buttonn">
        <button className="button-titlee" onClick={()=>nami("/Play")}>Play</button>
        </div>
    )
}
function CreateButton(){
    const nami = useNavigate();
    return (<div className="right-top-buttonn">
        <button className="button-titlee"onClick={()=>nami("/CreateSet")}>Create A Set</button>
        </div>
    )
}
function LoadButton(){
    const nami = useNavigate();
    return (<div className="right-bottom-buttonn">
        <button className="button-titlee"onClick={()=>nami("/LoadSet")}>Load A Set</button>
        </div>
    )
}

export default HomePage