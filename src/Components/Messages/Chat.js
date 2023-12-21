import React from 'react'
import Messages from './Messages'
import '../../style/chat.css'
import Input from './Input'
import { ChatContextProvider } from '../../context/ChatContext';


export default function Chat() {
    return (
        <ChatContextProvider> {/* Wrap your Messages component with ChatContextProvider */}
            <div className='chat'>
                <div className='chatInfo'>
                    <span>George</span>
                    <div></div>
                </div>
                <Messages />
                <Input />
            </div>
        </ChatContextProvider>
    )
}