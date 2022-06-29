import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';

import Navigation from "./components/Navigation/Navigation";
import SignUpForm from './components/SignUpForm/SignUpForm';

function App() {

  return (
    <Router>
      <div className="app w-full min-h-[100vh] bg-main">

        <Navigation />

        <Routes>

          <Route path="/" element={<div />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />


          <Route path="*" element={ <Navigate to="/" /> } />

        </Routes>



      </div>
    </Router>
  )
}

export default App
