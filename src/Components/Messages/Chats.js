
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import '../../style/chat.css'
import {  getDoc, doc } from 'firebase/firestore';
import { useUserInfo } from "../../api/fetch";
import ChatUserInfo from "./ChatUserInfo";


const Chats = ({ selectedChat, handleChatSelection }) => {
    const [userChats, setUserChats] = useState([]);
    const currentUser = useUserInfo();

    useEffect(() => {
        const fetchUserChats = async () => {
            try {
                if (currentUser && currentUser.id) {
                    const chatDocRef = doc(db, 'userChats', `${currentUser.id}`);
                    const docSnapshot = await getDoc(chatDocRef);

                    if (docSnapshot.exists()) {
                        const chatData = docSnapshot.data();
                        console.log('Fetched chat data:', chatData);
                        setUserChats([chatData]); 
                    } else {
                        console.log('Document not found for current user.');
                    }
                }
            } catch (error) {
                console.error('Error fetching user chats:', error);
            }
        };

        fetchUserChats();
    }, [currentUser]);

    return (
        <div className="chats">
            {userChats.length > 0 &&
                Object.entries(userChats[0])
                    .sort((a, b) => {
                        const dateA = a[1]?.lastMessage?.date?.seconds || 0; 
                        const dateB = b[1]?.lastMessage?.date?.seconds || 0;

                        return dateB - dateA; 
                    })
                    .map((chat) => (
                        <div
                            className={`userChat ${selectedChat === chat[1].chatId ? 'selected' : ''}`}
                            key={chat[0]}
                            onClick={() => handleChatSelection(chat[1].chatId)}
                        >
                            <div className="userChatInfo">
                                <ChatUserInfo chatId={chat[1].chatId} />
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                    ))
            }
        </div>

    );
};
export default Chats;