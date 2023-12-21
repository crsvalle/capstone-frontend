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

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const currentUser  = useUserInfo();
    const { data } = useContext(ChatContext);
    console.log(data)

    const handleSend = async () => {
        try {
            if (!currentUser || !currentUser.id) {
                console.error('Invalid current user data:', `${currentUser}`);
                return;
            }
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                        // Handle error
                        console.error("Upload error:", error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateChatMessages(downloadURL);
                        });
                    }
                );
            } else {
                await updateChatMessages();
            }

            // Update user chats with last message and date
            await updateDoc(doc(db, "userChats", `${currentUser.id}`), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", `${data.user.id}`), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            setText("");
            setImg(null);
        } catch (error) {
            console.error("Message sending error:", error);
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
