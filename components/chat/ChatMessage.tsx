import React from 'react';
import { ChatMessage as MessageType } from '../../constants/chatTypes';

interface Props {
    message: MessageType;
}

const ChatMessage: React.FC<Props> = ({ message }) => (
    <div className={`max-w-md px-4 py-2 rounded-lg text-sm ${message.sender === 'me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
        <p>{message.text}</p>
        <span className="block text-xs text-right mt-1 text-gray-400">{message.timestamp}</span>
    </div>
);

export default ChatMessage;
