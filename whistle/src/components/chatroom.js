// src/components/ChatRoom.js

import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../components/firebaseConfig';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import ChatMessage from '../components/Chatmessage.js';
import '../App.css';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const dummy = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach(doc => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: input,
      createdAt: new Date(),
      uid,
      photoURL
    });

    setInput('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chatroom">
      <div className="messages">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit" disabled={!input}>Send</button>
      </form>
    </div>
  );
}



export default ChatRoom;
