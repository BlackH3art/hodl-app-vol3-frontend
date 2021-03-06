import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation/Navigation';
import SignUpForm from './components/SignUpForm/SignUpForm';
import LoginForm from './components/LoginForm/LoginForm';
import HodlApp from './components/HodlApp/HodlApp';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ProtectedRoutes from './components/Reusable/ProtectedRoutes';
import CookieModal from './components/CookieModal/CookieModal';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {

  const { showCookieModal } = useContext(UserContext);

  return (
    <Router>
      <div className="app relative w-full min-h-[95vh] bg-main">

        <ToastContainer />

        <Navigation />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUpForm />} />
          <Route path="/policy" element={<PrivacyPolicy />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/app/*" element={<HodlApp />} />
          </Route>

          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>


        {showCookieModal && <CookieModal />}

      </div>

      <Footer />
    </Router>
  )
}

export default App
