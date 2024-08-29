import React, { useState, useContext } from 'react';
import UserContext from '../components/UserContext'; // Ensure the path is correct
import UserProfile from '../components/userProfile'; // Ensure the path is correct
import './ChatMessage.css';

function ChatMessage({ message }) {
  const { text, uid } = message;
  const { userInfo } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility

  const messageClass = uid === userInfo?.uid ? 'sent' : 'received';

  // Function to toggle the profile view
  const handleProfileClick = () => {
    setShowProfile(prevState => !prevState); // Toggle profile visibility
  };

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={userInfo?.photoURL || 'https://via.placeholder.com/150'}
        alt="Avatar"
        className="message-avatar"
        onClick={handleProfileClick} // Toggle profile view on click
        style={{ cursor: 'pointer' }}
      />
      <p>{text}</p>

      {/* Conditionally render UserProfile */}
      {showProfile && (
        <div className="container">
          <UserProfile userId={uid} /> {/* Pass userId as a prop */}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;
