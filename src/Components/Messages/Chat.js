
import Messages from './Messages';
import '../../style/chat.css';
import Input from './Input';
import { useChatContext } from '../../context/ChatContext';
import { useUserInfo, useUserDataById } from '../../api/fetch';

export default function Chat() {
    const { selectedChat } = useChatContext();
    const currentUser = useUserInfo();
    
    const getOtherUserId = () => {
        if (!selectedChat || !currentUser) return null;
        
        const [userId1, userId2] = selectedChat.split('-');
        
        
        if (userId1 === `${currentUser.id}`) {
            return userId2; 
        } else if (userId2 === currentUser.id) {
            return userId1; 
        }
        
        return null;
    };
    const otherUserId = getOtherUserId();
    const data = useUserDataById(otherUserId);

    

  return (
    <div className='chat'>
      <div className='chatInfo'>
      {data ? (
                    <span>{`${data.first_name} ${data.last_name}`}</span>
                ) : (
                    <span>No chat selected</span>
                )}
      </div>
      <Messages selectedChat={selectedChat} />
      <Input chatId={selectedChat}/>
    </div>
  );
}
