'use client';

import React, { useState } from 'react';
import { useParticipants, useRoomContext } from '@livekit/components-react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { callDetailsOptions } from '@/constants/data';
import ParticipantsList from './ParticipantsList';
import ChatComponent from './ChatComponent';

export default function MeetingParticipantList() {
  const room = useRoomContext();
  const participants = useParticipants();
  const [activeTab, setActiveTab] = useState('participants');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Function to generate avatar background color
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-400',
      'bg-green-400',
      'bg-purple-400',
      'bg-pink-400',
      'bg-yellow-400',
      'bg-indigo-400',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'participants':
        return <ParticipantsList />;
      case 'chat':
        return <ChatComponent />;
      case 'transcript':
        return (
          <div className="flex flex-col h-full bg-[#F8F8F8] rounded-2xl p-2">
            <div className="text-xs font-medium text-gray-500 mb-4 tracking-wider ml-2 mt-2">
              TRANSCRIPT
            </div>
            <div className="flex-1 bg-white rounded-2xl p-4 flex items-center justify-center">
              <div className="text-center text-gray-400 text-sm">
                Transcript feature coming soon...
              </div>
            </div>
          </div>
        );
      default:
        return <ParticipantsList />;
    }
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white flex flex-col">
      {/* Call Details Header */}
      <div className="text-left text-lg font-semibold p-6 pb-4 text-[#262A35]">Call Details</div>

      {/* Call Details Options */}
      <div className="px-6 mb-4">
        <div className="bg-[#F4F4F5] flex gap-6 px-4 py-3 rounded-3xl justify-between">
          {callDetailsOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(option.id)}
              className={`flex items-center gap-2 transition text-[#262A35] ${
                activeTab === option.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
            >
              <img src={option.icon} alt={option.label} className="w-5 h-5" />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pb-6 overflow-hidden">{renderContent()}</div>
    </div>
  );
}
