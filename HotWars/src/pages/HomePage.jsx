import './HomePage.css';
import './Play.jsx';
import './CreateSet.jsx';
import './BuiltIn.jsx'
import {User } from 'lucide-react';
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"

const HomePage = () => {
    return(
        <div className="startPanelx">
            <header className="startHeaderr">
                <h1 className="gameTitlee">HOT WARS!</h1>
                <User className="icon user-icon" size={36} color="#e0e0e0" />
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
        <button className="button-titlee" onClick={()=>nami("/BuiltIn")}>Select & Play</button>
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