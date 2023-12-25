
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import '../../style/chat.css'
import { collection, query, where, getDoc, doc } from 'firebase/firestore';
import { useUserInfo } from "../../api/fetch";

const Chats = () => {
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
                        // Extract necessary chat data and format as needed
                        console.log('Fetched chat data:', chatData);

                        // Update state with the fetched chat data
                        setUserChats([chatData]); // Assuming you receive an array of chats
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
                Object.entries(userChats[0]).sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div
                        className="userChat"
                        key={chat[0]}
                        // onClick={() => handleSelect(chat[1].userInfo)}
                    >
                        {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
                        <div className="userChatInfo">
                            {/* <span>{chat[1].userInfo.displayName}</span> */}
                            <p>{chat[1].chatId}</p>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>

    );
};
export default Chats;