import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  const value = {
    selectedChat,
    setSelectedChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};