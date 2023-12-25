import React, { useState } from 'react';
import { useUserInfo } from '../../api/fetch';
import { v4 as uuid } from 'uuid';
import { serverTimestamp, doc, updateDoc, arrayUnion, Timestamp, query, collection, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

const Input = ({ chatId }) => {
  const currentUser = useUserInfo();
  const [text, setText] = useState('');

  const handleSend = async () => {
    try {
      if (!currentUser || !currentUser.id || !chatId || !text) {
        console.error('Invalid data for sending message');
        return;
      }
      const [userId1, userId2] = chatId.split('-');
      const otherUserId = userId1 === currentUser.id ? userId1 : userId2;


      const message = {
        id: uuid(),
        text,
        senderId: `${currentUser.id}`,
        date: Timestamp.now(),
      };

      const chatDocRef = doc(db, 'chats', chatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion(message),
      });

      const messagesQuery = query(
        collection(db, 'chats', chatId, 'messages'),
        limit(1)
      );


      const querySnapshot = await getDocs(messagesQuery);
      console.log('Query Snapshot:', querySnapshot);

      let lastMessage = null;

      querySnapshot.forEach((doc) => {
        console.log('Message Document Data:', doc.data());
        lastMessage = doc.data();
      });

      const userChatsRef = doc(db, 'userChats', `${currentUser.id}`);
      await updateDoc(userChatsRef, {
        [otherUserId]: {
          chatId,
          lastMessage,
        },
      });

      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;
