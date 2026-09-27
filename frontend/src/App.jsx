import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import ReportPage from './pages/ReportPage';
import About from './pages/About';

function App() {
  return (
    <AssessmentProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#F7FAF7] text-[#17321F] selection:bg-[#72B87A]/30">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AssessmentProvider>
  );
}

export default App;
