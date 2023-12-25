import React, { useContext, useState } from "react";
import { useUserInfo } from "../../api/fetch";
import { ChatContext } from "../../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import '../../style/chat.css'

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const currentUser  = useUserInfo();
    const { data } = useContext(ChatContext);
    console.log(data)

    const handleSend = async () => {
        try {
            if (!currentUser || !currentUser.id ) {
                console.error('Invalid current user or chat ID');
                return;
            }
    
            const messageData = {
                id: uuid(), // Generate a unique ID for the message
                text,
                senderId: currentUser.id,
                date: serverTimestamp(), // Timestamp indicating the message sending time
            };
    
            if (img) {
                // Logic to handle image upload and storage URL
                // Update messageData with the image URL or any other relevant data
                messageData.img = 'your_image_url_here';
            }
    
            // Update Firestore document for the chat with the new message
            // await updateDoc(doc(db, 'chats', chatId), {
            //     messages: arrayUnion(messageData),
            // });
    
            setText('');
            setImg(null);
        } catch (error) {
            console.error('Message sending error:', error);
        }
    };

    const updateChatMessages = async (downloadURL = null) => {
        try {

            const messageData = {
                id: uuid(),
                text,
                senderId: `${currentUser.id}`,
                date: Timestamp.now(),
            };

            if (downloadURL) {
                messageData.img = downloadURL;
            }

            await updateDoc(doc(db, "chats", `${data.chatId}`), {
                messages: arrayUnion(messageData),
            });
        } catch (error) {
            console.error("Error updating chat messages:", error);
        }
    };


    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file"></label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
