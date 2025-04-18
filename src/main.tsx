import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const container = document.getElementById("root");
const root = createRoot(container!); // Usa createRoot en lugar de ReactDOM.render

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf_7OFK3oF-GMDHb5emk0dEd8IPprJkKc",
  authDomain: "sentirsaludbdd.firebaseapp.com",
  projectId: "sentirsaludbdd",
  storageBucket: "sentirsaludbdd.firebasestorage.app",
  messagingSenderId: "656169943679",
  appId: "1:656169943679:web:a96f8a9f27a905f79eb54a",
  measurementId: "G-KDCMRK8BK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db , auth };