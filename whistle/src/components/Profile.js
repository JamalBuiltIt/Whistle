import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebaseConfig.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Profile.css';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const updateProfile = async () => {
    if (!auth.currentUser) {
      console.error('No authenticated user');
      return;
    }

    console.log("Authenticated User ID:", auth.currentUser.uid); // Log user ID
    console.log("Selected file:", file); // Log selected file

    const photoRef = ref(storage, `profiles/${auth.currentUser.uid}`);

    try {
      if (file) {
        await uploadBytes(photoRef, file);
        const downloadURL = await getDownloadURL(photoRef);
        await setDoc(doc(db, 'users', auth.currentUser.uid), { bio, photoURL: downloadURL });
      } else {
        await setDoc(doc(db, 'users', auth.currentUser.uid), { bio });
      }
      // Redirect to chatroom after profile update
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const loadProfile = async () => {
    if (!auth.currentUser) return;

    const docRef = doc(db, 'users', auth.currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="profile-container">
      <img
        src={userInfo?.photoURL || 'https://via.placeholder.com/150'}
        alt="Profile"
        className="profile-photo"
      />
      <p className="le-bio">{userInfo?.bio || 'No bio available'}</p>
      <input
        type="file"
        id="profile-photo"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input"
      />
      <input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Update bio"
        className="bio-input"
      />
      <button onClick={updateProfile} className="update-button">Update Profile</button>
    </div>
  );
}

export default Profile;
