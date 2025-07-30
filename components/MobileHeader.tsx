'use client';

import React from 'react';
import { useRoomInfo, useParticipants } from '@livekit/components-react';

export default function MobileHeader() {
  const roomInfo = useRoomInfo();
  const participants = useParticipants();

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200 md:hidden">
      <div className="flex items-center justify-between p-4">
        {/* Left Box */}
        <div className="flex-1 max-w-[45%]">
          <div className="bg-gray-100 rounded-lg p-3 h-12 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {roomInfo.name || 'Meeting Room'}
            </span>
          </div>
        </div>

        {/* Right Box */}
        <div className="flex-1 max-w-[45%]">
          <div className="bg-gray-100 rounded-lg p-3 h-12 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {participants.length} Participant{participants.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
