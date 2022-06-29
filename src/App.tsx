import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from "./components/Navigation/Navigation";

function App() {

  return (
    <Router>
      <div className="app w-full min-h-[100vh] bg-main">

        <Navigation />

        <Routes>

          <Route path="/" element={<div />} />


          <Route path="*" element={ <Navigate to="/" /> } />

        </Routes>



      </div>
    </Router>
  )
}

export default App
