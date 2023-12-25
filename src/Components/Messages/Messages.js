import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { useUserInfo } from '../../api/fetch';
import Message from './Message'

const Messages = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = useUserInfo();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (selectedChat) {
          const messagesQuery = query(
            collection(db, 'chats', selectedChat, 'messages')
          );

          const querySnapshot = await getDocs(messagesQuery);
          const chatMessages = [];

          querySnapshot.forEach((doc) => {
            // Collect message data and push it into an array
            chatMessages.push({ id: doc.id, ...doc.data() });
          });

          setMessages(chatMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
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
