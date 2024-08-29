// src/components/Logout.js

import React from 'react';
import { auth } from './firebaseConfig.js';
import './Logout.css';

function Logout() {
  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="logout">
      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
}

export default Logout;
