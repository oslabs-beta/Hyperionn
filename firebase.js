import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/auth';

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
export const auth = firebase.getAuth(app);
export default app;
