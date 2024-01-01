import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Message from './Message'

const Messages = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const unSub = onSnapshot(doc(db, "chats", selectedChat), (snapshot) => {
        const data = snapshot.data();
        if (data && data.messages) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      });
  
      return () => {
        unSub();
      };
    }
  }, [selectedChat]);

  return (
    <div className="messages">
     {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
