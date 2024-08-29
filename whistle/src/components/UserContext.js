// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../components/firebaseConfig.js'; // Import auth and db
import { onAuthStateChanged } from 'firebase/auth'; // Import auth state change observer

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  // Function to fetch user info
  const fetchUserInfo = async (userId) => {
    const docRef = doc(db, 'users', userId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        console.error('No such user!');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid); // Fetch user info when user is authenticated
      } else {
        setUserInfo(null); // Clear user info if no user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
