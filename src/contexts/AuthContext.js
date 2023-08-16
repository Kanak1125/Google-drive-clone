import React, { useState, createContext, useContext, useEffect } 
from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe; // this stops the listening for changes in the Auth state...
        // or the observer is unsubscribed when the component unmounts.
    }, []);
    const value = {
        currentUser,
        signup,
        login,
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