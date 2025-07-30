'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  useDataChannel,
  useRoomContext,
  useLocalParticipant,
} from '@livekit/components-react';
import { Send, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  message: string;
  timestamp: number;
  participant: {
    name: string;
    identity: string;
  };
}

export default function ChatComponent() {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for data channel messages (chat)
  useDataChannel((message) => {
    try {
      const chatData = JSON.parse(new TextDecoder().decode(message.payload));
      if (chatData.type === 'chat') {
        const newChatMessage: ChatMessage = {
          id: Date.now().toString(),
          message: chatData.message,
          timestamp: Date.now(),
          participant: {
            name: message.from?.name || 'Unknown',
            identity: message.from?.identity || '',
          },
        };
        setMessages(prev => [...prev, newChatMessage]);
      }
    } catch (error) {
      console.error('Error parsing chat message:', error);
    }
  });

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !room || !localParticipant) return;

    try {
      const chatData = {
        type: 'chat',
        message: newMessage.trim(),
        timestamp: Date.now(),
      };

      // Send via data channel
      await localParticipant.publishData(
        new TextEncoder().encode(JSON.stringify(chatData)),
        { reliable: true }
      );

      // Add to local messages immediately
      const localMessage: ChatMessage = {
        id: Date.now().toString(),
        message: newMessage.trim(),
        timestamp: Date.now(),
        participant: {
          name: localParticipant.name || 'You',
          identity: localParticipant.identity,
        },
      };
      setMessages(prev => [...prev, localMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (identity: string) => {
    const colors = [
      'bg-blue-400',
      'bg-green-400',
      'bg-purple-400',
      'bg-pink-400',
      'bg-yellow-400',
      'bg-indigo-400'
    ];
    const index = identity.length % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F8F8] rounded-2xl p-2">
      {/* Chat Header */}
      <div className="text-xs font-medium text-gray-500 mb-4 tracking-wider ml-2 mt-2">
        CHAT ({messages.length})
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl p-4 mb-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full ${getAvatarColor(msg.participant.identity)} flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                {getInitials(msg.participant.name)}
              </div>
              
              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {msg.participant.name}
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div className="text-sm text-gray-700 break-words">
                  {msg.message}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 text-black bg-gray-50 rounded-lg px-3 py-2 text-sm border-none outline-none focus:bg-gray-100 transition-colors"
            maxLength={500}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
