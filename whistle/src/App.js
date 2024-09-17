// src/App.js

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebaseConfig';
import ChatRoom from './components/chatroom';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import UserProfile from './components/userProfile';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import { UserProvider } from './components/UserContext'; // Import UserProvider
import './App.css';
import './components/Logout.css';

function App() {
  const [user, loading] = useAuthState(auth);
  const [showProfile, setShowProfile] = useState(false);

  // Optional: use effect to handle side effects if needed
  useEffect(() => {
    // Perform any side effects or redirection if needed
  }, [user]);

  // Show loading spinner or placeholder while authentication status is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header onProfileClick={() => setShowProfile(prev => !prev)} />

          {/* Only render Logout component if the user is authenticated */}
          {user && <Logout />}
          
          <Routes>
            {/* Define routes for authenticated and unauthenticated users */}
            {user ? (
              <>
                <Route path="/chatroom" element={<ChatRoom />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/" element={showProfile ? <Profile /> : <Navigate to="/chatroom" />} />
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
            {/* Catch-all route to handle undefined paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
