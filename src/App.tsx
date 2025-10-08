import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import CoursesPage from './pages/myCoursesPage';
import Register from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./pages/AdminRoute";
import CoursePage from './pages/CoursePage';
import BioInfoPage from './pages/BioInfoPage';
import BioSessionsPage from './pages/BioSessionsPage';
import EbookLandingPage from './pages/ebookLandingPage';
import GraciasEbookPage from './pages/GraciasEbookPage';
import OctubreSeminarioPage from './pages/OctubreSeminarioPage';
import WhatsAppButton from './components/WhatsAppButton';


function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/miscursos" element={<CoursesPage />} />
        <Route path="/sesionesbio" element={<BioSessionsPage />} />
        <Route path="/bioinfo" element={<BioInfoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/courses/:id" element={<CoursesPage />} />
        <Route path="/ebook" element={<EbookLandingPage />} />
        <Route path="/ebook/gracias" element={<GraciasEbookPage />} />
        <Route path="/octubreseminario" element={<OctubreSeminarioPage />} />
      </Routes>
      <WhatsAppButton 
        phoneNumber="59896611764" 
        message="Hola! Vengo desde la página web de Sentir Salud, me gustaría obtener más información"
      />
      <Analytics />
    </Router>
  );
}

export default App;