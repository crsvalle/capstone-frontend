import React from 'react'
import Chats from './Chats'
import '../../style/chat.css'
import ChatSearch from './ChatSearch'
import { ChatContextProvider } from '../../context/ChatContext'

export default function ChatSidebar() {
    return (
        <ChatContextProvider>
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                <ChatSearch />
                <Chats />

            </div>
        </ChatContextProvider>
    )
}
