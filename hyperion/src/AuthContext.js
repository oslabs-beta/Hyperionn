import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebase.js"
import app from '../firebase.js';
import { ConstructionOutlined, Google } from "@mui/icons-material";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
     signOut, 
     sendPasswordResetEmail,
     updateEmail,
     updatePassword,
     onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
     } from "firebase/auth"
const goog = new GoogleAuthProvider()
const github = new GithubAuthProvider();
const AuthContext = React.createContext()
//const auth = getAuth()
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
function loginWithGoogle(){
    const result = signInWithPopup(auth, goog)
    return result;
}

async function loginWithGithub(){
    const result = await signInWithPopup(auth, github)
    return result;
}
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithGithub,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}