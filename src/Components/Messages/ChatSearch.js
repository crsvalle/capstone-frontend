    import { useEffect } from "react"
    import {
        setDoc,
        doc,
        updateDoc,
        serverTimestamp,
        getDoc,
    } from "firebase/firestore";
    import { db } from '../firebase'
    import { useLocation } from "react-router-dom";
    import { useUserInfoNav, useUserDataById } from "../../api/fetch";
    import { useSelector } from "react-redux";


    const API = process.env.REACT_APP_API_URL;

    export default function ChatSearch() {
        const { isAuth } = useSelector((state) => state.auth);

        const currentUser = useUserInfoNav(isAuth)
        const location = useLocation();
        const { ownerId } = location.state || {};
        const userData = useUserDataById(ownerId, API)
        const user = userData || {}


        const handleSearch = () => {

        };

        const handleKey = e => {
            e.code === "Enter" && handleSearch();
        }

        const setUserIdInFirestore = async (userId) => {
            const userDocRef = doc(db, 'users', `${userId}`); // Assuming 'users' collection exists
            await setDoc(userDocRef, { userId }); // Set the 'userId' field in the 'users' collection
        };


        const handleSelect = async () => {
            const combinedId = currentUser.id > ownerId ? `${currentUser.id}` + `${ownerId}` : `${ownerId}` + `${currentUser.id}`;

            try {
                const res = await getDoc(doc(db, "chats", `${combinedId}`));
                console.log('test', res.data());
                if (!res.exists()) {
                    //create a chat in chats collection
                    await setDoc(doc(db, "chats", `${combinedId}`), { messages: [] });

                    //create user chats
                    await updateDoc(doc(db, "userChats", `${currentUser.uid}`), {
                        [`${combinedId}` + ".userInfo"]: {
                            uid: `${user.id}`,
                            displayName: user.first_name + user.last_name,
                            photoURL: "",
                        },
                        [`${combinedId}` + ".date"]: serverTimestamp(),
                    });

                    await updateDoc(doc(db, "userChats", `${user.id}`), {
                        [`${combinedId}` + ".userInfo"]: {
                            uid: `${currentUser.id}`,
                            displayName: currentUser.first_name + currentUser.last_name,
                            photoURL: '',
                        },
                        [`${combinedId}` + ".date"]: serverTimestamp(),
                    });
                    if (currentUser) {
                        // Set the user's unique ID in Firestore
                        await setUserIdInFirestore(currentUser.id);
                    }
                }
            } catch (err) { console.error('Error in handleSelect:', err); }
        }

        useEffect(() => {
            if (currentUser) {
                handleSelect(); // Automatically trigger the handleSelect function when ownerId changes
            }

        }, [currentUser]);

        return (
            <div className="border-b-2 py-4 px-2">
                <input
                    type="text"
                    placeholder="search chat"
                    className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    onKeyDown={handleKey}
                // onChange={e => setUsername(e.target.value)}
                />
            </div>
        )
    }
