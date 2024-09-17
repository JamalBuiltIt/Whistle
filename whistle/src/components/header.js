// src/components/Header.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig'; // Ensure correct import path
import './header.css'; // Ensure the CSS file name and path are correct

function Header({ onProfileClick }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleProfileClick = () => {
   
    navigate('/userProfile');

    onProfileClick();
  };

  return (
    <header className="header">
      {user && (
        <div className="profile-icon" onClick={handleProfileClick}>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
      )}
    </header>
  );
}

export default Header;
