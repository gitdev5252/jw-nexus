'use client';

import React, { useState } from 'react';
import { 
  useMaybeRoomContext, 
  useLocalParticipant, 
  useRoomInfo 
} from '@livekit/components-react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MoreHorizontal, 
  PhoneOff,
  Monitor,
  Hand,
  Smile,
  FileText
} from 'lucide-react';

export default function MobileControls() {
  const room = useMaybeRoomContext();
  const { localParticipant } = useLocalParticipant();
  const roomInfo = useRoomInfo();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);

  const toggleMicrophone = async () => {
    if (localParticipant) {
      await localParticipant.setMicrophoneEnabled(!localParticipant.isMicrophoneEnabled);
    }
  };

  const toggleCamera = async () => {
    if (localParticipant) {
      await localParticipant.setCameraEnabled(!localParticipant.isCameraEnabled);
    }
  };

  const toggleScreenShare = async () => {
    if (localParticipant) {
      if (isScreenSharing) {
        await localParticipant.setScreenShareEnabled(false);
      } else {
        await localParticipant.setScreenShareEnabled(true);
      }
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised);
    // You can implement hand raise logic here
  };

  const leaveCall = () => {
    if (room) {
      room.disconnect();
    }
  };

  const moreOptions = [
    {
      id: 'screen',
      label: 'Share Screen',
      icon: Monitor,
      onClick: toggleScreenShare,
      isActive: isScreenSharing
    },
    {
      id: 'hand',
      label: 'Raise Hand',
      icon: Hand,
      onClick: toggleHandRaise,
      isActive: isHandRaised
    },
    {
      id: 'emoji',
      label: 'Reactions',
      icon: Smile,
      onClick: () => {
        // Implement emoji reactions
        setShowMoreMenu(false);
      }
    },
    {
      id: 'transcript',
      label: 'Transcript',
      icon: FileText,
      onClick: () => {
        // Implement transcript
        setShowMoreMenu(false);
      }
    }
  ];

  return (
    <>
      {/* Mobile Controls - Only visible on small screens */}
      <div className="fixed bottom-24 left-0 right-0 z-40 md:hidden">
        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border border-gray-200">
            <div className="flex items-center gap-4">
              {/* Microphone */}
              <button
                onClick={toggleMicrophone}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  localParticipant?.isMicrophoneEnabled
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-red-500 text-white'
                }`}
                title={localParticipant?.isMicrophoneEnabled ? 'Mute' : 'Unmute'}
              >
                {localParticipant?.isMicrophoneEnabled ? (
                  <Mic size={20} />
                ) : (
                  <MicOff size={20} />
                )}
              </button>

              {/* Camera */}
              <button
                onClick={toggleCamera}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  localParticipant?.isCameraEnabled
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-red-500 text-white'
                }`}
                title={localParticipant?.isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {localParticipant?.isCameraEnabled ? (
                  <Video size={20} />
                ) : (
                  <VideoOff size={20} />
                )}
              </button>

              {/* More Options */}
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center transition-all"
                title="More options"
              >
                <MoreHorizontal size={20} />
              </button>

              {/* Leave Call */}
              {/* Divider */}
              <div className="border-t border-gray-200 my-2" />
              <button
                onClick={leaveCall}
                className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center transition-all"
                title="Leave call"
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* More Options Menu */}
      {showMoreMenu && (
        <div className="fixed bottom-44 left-0 right-0 z-50 md:hidden">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 mx-4 max-w-sm w-full">
              <div className="grid grid-cols-2 gap-3">
                {moreOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.onClick}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                      option.isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <option.icon size={24} />
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close more menu */}
      {showMoreMenu && (
        <div 
          className="fixed inset-0 z-30 md:hidden" 
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </>
  );
}
