import React from 'react'
import Chats from './Chats'
import '../../style/chat.css'
import ChatSearch from './ChatSearch'
import { useChatContext } from '../../context/ChatContext'


export default function ChatSidebar() {
    const { selectedChat, setSelectedChat } = useChatContext();

    const handleChatSelection = (chatId) => {
        setSelectedChat(chatId);
      };

    return (
            <div className="flex flex-col w-2/5 border-r-2 ">
                <ChatSearch />
                <Chats selectedChat={selectedChat} handleChatSelection={handleChatSelection} /> 
            </div>

    )
}
