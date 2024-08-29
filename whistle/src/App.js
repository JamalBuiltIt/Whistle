// src/App.js

import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebaseConfig';
import ChatRoom from './components/chatroom.js';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import UserProfile from './components/userProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header.js';
import { UserProvider } from './components/UserContext'; // Import UserProvider
import './App.css';
import './components/Logout.css';


function App() {
  const [user] = useAuthState(auth);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Header onProfileClick={handleProfileToggle} />
        
        {/* Only render Logout component if the user is authenticated */}
        {user && <Logout />}
        
        <Routes>
          {/* Define routes for authenticated users */}
          {user ? (
            <>
              {showProfile ? (
                <Route path="/" element={<Profile />} />
              ) : (
                <Route path="/" element={<ChatRoom />} />
              )}
              <Route path="/profile" element={<UserProfile />} />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
