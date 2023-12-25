
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '../../api/fetch';


const initiateChat = async (currentUser, otherUser) => {
    try {

        console.log(currentUser, otherUser)
        const chatId = `${currentUser}-${otherUser}`;

        const chatRef = doc(db, 'chats', chatId);
        await setDoc(chatRef, {
            chatId,
            users: [currentUser, otherUser], 
            messages: [],
        });

        await updateUserChats(currentUser, otherUser, chatId);
        await updateUserChats(otherUser, currentUser, chatId);


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
    let otherUser = location.state.ownerId || null;
    let currentUser = useUserInfo();
    otherUser = String(otherUser)
    currentUser = String(currentUser.id)

    const handleChatInitiation = () => {
        if (otherUser) {
            initiateChat(currentUser, otherUser);
        } else {
            console.error('Other user ID not found.');
        }
    };

    return (
        <div className="border-b-2 py-4 px-2">
            <button onClick={handleChatInitiation}>Initiate Chat</button>

        </div>
    )
};

export default ChatSearch;

