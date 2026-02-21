import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Department from './components/Department';
import Projects from './components/Projects';
import Alumni from './components/Alumni';
import EventDetails from './components/EventDetails';
import Research from './components/Research';
import GpaCalculator from './components/GpaCalculator';
import Committee from './components/Committee';
import AlumniLogin from './components/AlumniLogin';
import AlumniRegister from './components/AlumniRegister';
import AlumniUpdateProfile from './components/AlumniUpdateProfile';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark'); // Default to dark mode for premium feel

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <ScrollToTop />
          <div className="app-container">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/department" element={<Department />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/research" element={<Research />} />
              <Route path="/gpa" element={<GpaCalculator />} />
              <Route path="/committee" element={<Committee />} />
              <Route path="/alumni/login" element={<AlumniLogin />} />
              <Route path="/alumni/register" element={<AlumniRegister />} />
              <Route path="/alumni/profile" element={<AlumniUpdateProfile />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
