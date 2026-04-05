import { useState } from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"

 //make sure to import any new pages here
import LandingPanel from "./pages/LandingPanel"
import Page2 from "./pages/Page2"

//And add a route for any pages that you're adding. Path is what shows up in the URL,
//while element is the actual element you want to display
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingZone />} />
        <Route path = "/Page2" element={<Page2 />} />
      </Routes>
    </Router>
  )
}


//This function handles the logic for the initial transition, if you're adding
//transitions feel free to define more functions
function LandingZone() {
  const navigate = useNavigate()

  const leaveLanding = () => {
    navigate("/Page2")
  }

  return <LandingPanel onContinue={leaveLanding} />
} 

export default App
