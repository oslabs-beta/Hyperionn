// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import * as firebase from 'firebase/auth';









// import { getAnalytics } from "firebase/analytics";
//import firebase from  'firebase/compat/app' 

//import "firebase/auth";
//{ getAuth, onAuthStateChanged }
//import firebase from "./firebase";
// import firebase from 'firebase/compat/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import firebase from 'firebase/compat/app';

// import 'firebase/compat/auth';
// import 'firebase/compat/database';

// import "firebase/compat/app";
// import "firebase/compat/analytics";

// import {getAuth, 
//     signOut, 
//     sendPasswordResetEmail,
//      createUserWithEmailAndPassword,
//      signInWithEmailAndPassword,
//      signOut,
//      se 
//      } from "firebase/auth";

""

// firebase.initializeApp(firebaseConfig);

// // Namespaced syntax requires compat version
// //export const auth = firebase.auth();
// export const database = firebase.database();
// // Add the Firebase products that you want to use
// //import "firebase/auth";
// console.log('Firebase.auth: ', firebase.auth);
// //import 'firebase/compat/auth';


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
// console.log('app', app)
export const auth = firebase.getAuth(app);
// export default ;
export default app;

//export firebase;