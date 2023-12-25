
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '../../api/fetch';
import { useEffect } from 'react';


const initiateChat = async (currentUser, otherUser) => {
    try {
        const chatId = `${currentUser}-${otherUser}`;
        const chatRef = doc(db, 'chats', chatId);

        const chatSnapshot = await getDoc(chatRef);

        if (!chatSnapshot.exists()) {
            await setDoc(chatRef, {
                chatId,
                users: [currentUser, otherUser],
                messages: [],
            });

            await updateUserChats(currentUser, otherUser, chatId);
            await updateUserChats(otherUser, currentUser, chatId);
        } else {
            console.log('Chat already exists:', chatSnapshot.data());
        }
    } catch (error) {
        console.error('Error initiating chat:', error);
    }
};

const updateUserChats = async (user, otherUser, chatId) => {
    const userChatsRef = doc(db, 'userChats', String(user));
    const userChatsSnapshot = await getDoc(userChatsRef);

    if (userChatsSnapshot.exists()) {
        const updatedChats = {
            ...userChatsSnapshot.data(),
            [String(otherUser)]: {
                chatId,
                lastMessage: null,
            },
        };

        await setDoc(userChatsRef, updatedChats);
    } else {
    
        const initialChats = {
            [String(otherUser)]: {
                chatId,
                lastMessage: null,
            },
        };

        await setDoc(userChatsRef, initialChats);
    }
};


const ChatSearch = () => {
    const location = useLocation();
    let otherUser = location.state ? location.state.ownerId : null;
    let currentUser = useUserInfo();
    otherUser = String(otherUser)
    currentUser = String(currentUser.id)

    useEffect(() => {
        if (otherUser !== `null` && currentUser !== `undefined` ) {
            initiateChat(currentUser, otherUser);
        }
    }, [otherUser, currentUser]);

    return (
        <div className="border-b-2 py-4 px-2">
            <h2>Chat</h2>
        </div>
    )
};

export default ChatSearch;

