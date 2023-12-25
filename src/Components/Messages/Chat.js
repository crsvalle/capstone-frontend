
import Messages from './Messages';
import '../../style/chat.css';
import Input from './Input';
import { useChatContext } from '../../context/ChatContext';

export default function Chat() {
    const { selectedChat } = useChatContext();

    console.log(selectedChat)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>George</span>
        <div></div>
      </div>
      <Messages selectedChat={selectedChat} />
      <Input chatId={selectedChat}/>
    </div>
  );
}
