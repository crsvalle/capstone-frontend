import React from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContextProvider } from '../../context/ChatContext';
import '../../style/chat.css'


export default function Chat() {
    return (
        <ChatContextProvider> 
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