import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
// import './Chat.css';

const ChatPage = () => {
  return (
    <div className="chat-container flex pl-[30px] bg-white w-full h-screen">
      <div className="flex w-full h-full">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
