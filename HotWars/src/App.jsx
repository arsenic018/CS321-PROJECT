import { useState } from 'react'
import LandingPanel from './pages/LandingPanel'

function App() {
  const [hasStarted, setHasStarted] = useState(false)

  const handleContinue = () => {
    setHasStarted(true);
    console.log("Play/Create/Load Set Options (TO implement by someone else)");
  };

  return (
    <>
      {!hasStarted ? (
        <LandingPanel onContinue={handleContinue} />
      ) : (
        <div style={{ color: 'white', padding: '2rem', fontFamily: 'Inter', background: '#0a0a0a', width: '100vw', height: '100vh' }}>
          <h2>Storyboard Panel 2: Mode Selection</h2>
          <p>Play/Create/Load Set Options (TO implement by someone else)</p>
        </div>
      )}
    </>
  )
}

export default App
