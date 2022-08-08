// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp29QyjHWW6Jojs2Hufn7z8zmNMVw5290",
  authDomain: "hyperion-272ea.firebaseapp.com",
  projectId: "hyperion-272ea",
  storageBucket: "hyperion-272ea.appspot.com",
  messagingSenderId: "90144758527",
  appId: "1:90144758527:web:462b4eb5b5408c5e63caca",
  measurementId: "G-3KM8KR7HS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;