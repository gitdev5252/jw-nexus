import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
// import './Chat.css';

const ChatLayout = () => {
    return (
        <div className="chat-container flex h-[90%] w-[90%] pl-[30px]">
            <div className='flex w-full h-full'>
                <ChatSidebar />
                <ChatWindow />
            </div>
        </div>
    );
};

export default ChatLayout;
