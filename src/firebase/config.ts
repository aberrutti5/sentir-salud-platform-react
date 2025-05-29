// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getFirestore(app);
export { db };