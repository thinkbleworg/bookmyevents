import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LandingPage from './pages/LandingPage';
import DetailPage from './pages/DetailPage';
import PageNotFound from "./pages/PageNotFound";
import EventHandlingPage from './pages/EventHandlingPage';


function App() {
  
  return (
    <ThemeProvider>
      <ToastProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/event" element={<EventHandlingPage />} />
                <Route path="/event/:id" element={<DetailPage />} />
                <Route path="/event/:id/edit" element={<EventHandlingPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </div>
        </LocalizationProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;