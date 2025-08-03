import React, { useState, useContext } from 'react';
// import { ChatContext } from '../../contexts/ChatContext.tsx';

const ChatInput = () => {
    const [text, setText] = useState('');
    // const { sendMessage } = useContext(ChatContext);

    const handleSend = () => {
        if (text.trim()) {
            // sendMessage(text);
            setText('');
        }
    };

    return (
        <div className="flex items-center border-t border-gray-300 p-4">
            <input
                type="text"
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={text}
                placeholder="Type a message"
                onChange={e => setText(e.target.value)}
            />
            <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
