import { useUserInfo, useUserDataById } from "../../api/fetch";

export default function ChatUserInfo({chatId}) {
    const currentUser = useUserInfo();
    
    const [userId1, userId2] = chatId.split('-');

    const otherUserId = userId1 === currentUser.id ? userId1 : userId2;

    const userData = useUserDataById(otherUserId);

    return (
        <div className="userChatInfo">
            <span>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</span>
        </div>
    );
}
