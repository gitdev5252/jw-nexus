'use client';
import React from 'react';
import { useLocalParticipant, useRoomContext } from '@livekit/components-react';

export const CustomControls = () => {
  const room = useRoomContext();
  const { cameraTrack, microphoneTrack } = useLocalParticipant();

  const toggleMic = () => {
    microphoneTrack?.muted ? microphoneTrack.unmute() : microphoneTrack?.mute();
  };

  const toggleCam = () => {
    cameraTrack?.muted ? cameraTrack.unmute() : cameraTrack?.mute();
  };

  const toggleScreen = async () => {
    try {
      await room.localParticipant.setScreenShareEnabled(!room.localParticipant.isScreenShareEnabled);
    } catch (e) {
      console.error('Screen Share Failed:', e);
    }
  };

  const leaveRoom = async () => {
    await room.disconnect();
    window.location.href = '/'; // or redirect wherever
  };

  return (
    <div className="flex gap-4 p-4 justify-center">
      <button onClick={toggleMic} className="bg-gray-900 text-white px-4 py-2 rounded">
        Toggle Mic
      </button>
      <button onClick={toggleCam} className="bg-gray-900 text-white px-4 py-2 rounded">
        Toggle Cam
      </button>
      <button onClick={toggleScreen} className="bg-gray-900 text-white px-4 py-2 rounded">
        Share Screen
      </button>
      <button onClick={leaveRoom} className="bg-red-600 text-white px-4 py-2 rounded">
        Leave
      </button>
    </div>
  );
};
