// src/components/Login.js

import React from 'react';
import { auth } from '../components/firebaseConfig.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../components/Login.css';

function Login() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="login">
      <h2>Welcome to Whistle Chat!</h2>
      <button onClick={signInWithGoogle} className="login-button">Sign in with Google</button>
    </div>
  );
}

export default Login;
