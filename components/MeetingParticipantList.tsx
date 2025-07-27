'use client';

import React from 'react';
import {
  useParticipants,
  useRoomContext,
} from '@livekit/components-react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { callDetailsOptions } from '@/constants/data';
import ParticipantsList from './ParticipantsList';

export default function MeetingParticipantList() {
  const room = useRoomContext();
  const participants = useParticipants();
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
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
      'bg-indigo-400'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white">
      {/* Call Details Header */}
      <div className="text-left text-lg font-semibold p-6 pb-4 text-[#262A35]">Call Details</div>

      {/* Call Details Options */}
      <div className="px-6 mb-4">
        <div className="bg-[#F4F4F5] flex gap-6 px-4 py-3 rounded-3xl justify-between">
          {callDetailsOptions.map((option) => (
            <button
              key={option.id}
              className="flex items-center gap-2 transition text-[#262A35]"
            >
              <img src={option.icon} alt={option.label} className="w-5 h-5" />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Participants List Component */}
      <div className="px-6">
        <ParticipantsList />
      </div>
    </div>
  );
}


