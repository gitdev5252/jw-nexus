import React, { useContext } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
// import { ChatContext } from '../../contexts/ChatContext';

const ChatWindow: React.FC = () => {
  // const { selectedChat } = useContext(ChatContext);

  const selectedChat = {
    messages: [
      { id: '1', text: 'Hello!', sender: 'me' as 'me', timestamp: '10:00 AM' },
      { id: '2', text: 'Hi there!', sender: 'them' as 'them', timestamp: '10:01 AM' },
    ],
  };

  if (!selectedChat) return <div className="chat-window empty">Select a chat</div>;

  return (
    <div className="w-full h-full">
      <div>
        <div className="flex items-center gap-[10px] p-[10px] hover:bg-gray-100 cursor-pointer justify-between">
          <div className="flex items-center gap-[10px]">
            <img className="w-[42px] h-[42px] rounded-[50%]" src="/images/avatars/Jane.png" />
            <div>
              <p className="font-semibold text-gray-800">Jane Nackos</p>
              <span className="text-sm text-gray-500">Activity - 3m ago</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500"> 8:14 </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-between h-[90%]">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {selectedChat.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
