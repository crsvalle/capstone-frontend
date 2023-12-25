import React, { useState } from 'react';
import { useUserInfo } from '../../api/fetch';
import { v4 as uuid } from 'uuid';
import { doc, updateDoc, arrayUnion, Timestamp, getDoc } from 'firebase/firestore';
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

      const chatDocSnapshot = await getDoc(chatDocRef);

      // Assuming messages is an object within the chat document
      const messages = chatDocSnapshot.data().messages;

      // Extract the keys (message IDs) from the messages object
      const messageIds = Object.keys(messages);

      // Get the latest message using the message ID
      const latestMessageId = messageIds.reduce((prev, current) =>
        messages[prev].date > messages[current].date ? prev : current
      );

      const lastMessage = messages[latestMessageId];

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
    <div className="inbox-input">
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
