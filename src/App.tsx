import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import DLocalConfigPage from './pages/DLocalConfigPage';

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
        <Route path="/admin/dlocal-config" element={<DLocalConfigPage />} />
      </Routes>
    </Router>
  );
}

export default App;