import React from "react"
import './Page2.css';
const page2 = () => {
    return(
        <div className="startPanel">
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
    return (
        <div className="left-middle-button">
        <button className="button-title">Play</button>
        </div>
    )
}
function CreateButton(){
    return (<div className="right-top-button">
        <button className="button-title">Create A Set</button>
        </div>
    )
}
function LoadButton(){
    return (<div className="right-bottom-button">
        <button className="button-title">Load A Set</button>
        </div>
    )
}

export default page2