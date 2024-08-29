import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function Rooms() {
  const [roomName, setRoomName] = useState('');

  const createRoom = async () => {
    if (roomName.trim()) {
      await addDoc(collection(getFirestore, 'rooms'), { name: roomName });
      setRoomName('');
    }
  };

  return (
    <div>
      <input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder="Create a new room" />
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
}

export default Rooms;
