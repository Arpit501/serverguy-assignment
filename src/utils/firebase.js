
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyGk-s1wV1rJa7wbTMs6dS3uJpYfLvEcI",
  authDomain: "serverguy-7e01d.firebaseapp.com",
  projectId: "serverguy-7e01d",
  storageBucket: "serverguy-7e01d.firebasestorage.app",
  messagingSenderId: "281197264801",
  appId: "1:281197264801:web:5f91fd738da6adabe895e0",
  measurementId: "G-RGPN9F9JVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();