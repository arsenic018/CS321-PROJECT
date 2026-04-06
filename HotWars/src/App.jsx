import { useState } from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
 } from "react-router-dom"

//imports all da pages
import * as Pages from "./pages"


//And add a route for any pages that you're adding. Path is what shows up in the URL,
//while element is the actual element you want to display
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingZone />} />
        <Route path = "/HomePage" element={<Pages.HomePage />} />
        <Route path = "/Play" element = {<Pages.Play />} />
        <Route path = "/LoadSet" element = {<Pages.LoadSet />} />
        <Route path = "/CreateSet" element = {<Pages.CreateSet />} />
         <Route path = "/BuiltIn" element = {<Pages.BuiltIn />} />
      </Routes>
    </Router>
  )
}


//This function handles the logic for the initial transition, if you're adding
//transitions feel free to define more functions
function LandingZone() {
  const navigate = useNavigate()

  const leaveLanding = () => {
    navigate("/HomePage")
  }

  return <Pages.LandingPanel onContinue={leaveLanding} />
} 


export default App
