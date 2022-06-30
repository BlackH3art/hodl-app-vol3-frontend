import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation/Navigation';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import HodlApp from './components/HodlApp/HodlApp';

function App() {

  return (
    <Router>
      <div className="app w-full min-h-[100vh] bg-main">

        <ToastContainer />

        <Navigation />

        <Routes>

          <Route path="/" element={<div />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/app/*" element={<HodlApp />} />


          <Route path="*" element={ <Navigate to="/" /> } />

        </Routes>



      </div>
    </Router>
  )
}

export default App
