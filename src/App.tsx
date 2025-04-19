import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import CoursesPage from './pages/myCoursesPage';
import Register from "./pages/RegisterPage";
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./pages/AdminRoute";
import CoursePage from './pages/CoursePage'; // Importa el componente de la página del curso
import BioInfoPage from './pages/BioInfoPage';
import BioSessionsPage from './pages/BioSessionsPage';

const paypalOptions = {
  clientId: "AZ7Xe4FST0ejsuYbo32flwIe-WEoUFXV3qaKrPZncRbrEE2RGZXgJrUgFGKGsq37m8Xr1MN5H9ExPgil", // Reemplaza esto con tu Client ID real de sandbox
  currency: "USD",
  intent: "capture"
};

function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/miscursos" element={<CoursesPage />} /> {/* Ruta para Mis Cursos */}
            <Route path="/sesionesbio" element={<BioSessionsPage />} />
            <Route path="/bioinfo" element={<BioInfoPage />}  />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route path="/courses/:id" element={<CoursesPage />} /> {/* Ruta dinámica */}
          </Routes>
        </Router>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;