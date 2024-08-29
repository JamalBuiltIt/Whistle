// src/components/UserProfile.js

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../components/UserContext';
import './Profile.css';
import './userProfile.css';


function UserProfile() {
  const { userId } = useParams();
  const { userInfo, fetchUserInfo } = useContext(UserContext);
  
  useEffect(() => {
    // Inline function definition
    const loadProfile = async () => {
      if (userId) {
        await fetchUserInfo(userId);
      }
    };

    loadProfile();
  }, 
  
  [userId, fetchUserInfo]); // Include dependencies in the array

  if (!userInfo) {
    return <div>Loading...</div>; // Show a loading message or placeholder
  }

  return (
    <div className="profile-container">
      <img
        src={userInfo.photoURL || 'https://via.placeholder.com/150'}
        alt="Profile"
        className="profile-photo"
      />
      <p className="profile-bio">{userInfo.bio || 'No bio available'}</p>
    </div>
  );
}

export default UserProfile;
