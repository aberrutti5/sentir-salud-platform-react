import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/next"
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


function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;