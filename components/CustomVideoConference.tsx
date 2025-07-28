"use client";

import {
    GridLayout,
    ParticipantTile,
    useRoomContext,
    useTracks,
    useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    MonitorUp,
    PhoneOff,
    Hand,
    Smile,
    Languages,
} from "lucide-react";
import React from "react";

export default function CustomVideoConference() {
    const room = useRoomContext();
    const { isMicrophoneEnabled, isCameraEnabled } = room.localParticipant;
    const { cameraTrack, microphoneTrack } = useLocalParticipant();

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    const toggleMic = async () => {
        await room.localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    };

    const toggleCam = async () => {
        await room.localParticipant.setCameraEnabled(!isCameraEnabled);
    };

    const toggleScreen = async () => {
        try {
            await room.localParticipant.setScreenShareEnabled(
                !room.localParticipant.isScreenShareEnabled
            );
        } catch (e) {
            console.error("Screen Share Failed:", e);
        }
    };

    const leaveRoom = async () => {
        await room.disconnect();
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#ffffff] p-4 text-black">
            {/* <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#262A35', fontWeight: '600', fontSize: 20 }}>Friends Catch Up Call</div> */}
            <div className="text-left text-lg font-semibold py-2">Friends Catch Up Call</div>

            {/* Top Recording Bar */}
            {/* <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-200 text-sm px-4 py-1 rounded-full shadow flex items-center gap-3">
                <span className="text-red-600 font-bold">🔴 Recording in process..</span>
                <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-gray-800">⏸</button>
                    <button className="text-gray-500 hover:text-gray-800">⏹</button>
                </div>
            </div> */}
            {/* Participant Grid */}
            <div className="flex-1 overflow-hidden">
                <GridLayout tracks={tracks} className="w-full h-full rounded-xl">
                    <ParticipantTile namePosition="top-left" showAudioIndicator />
                </GridLayout>
            </div>

            {/* Bottom Control Bar */}
            <div className="flex items-center px-10 py-3 justify-end mb-8">
                <div className="flex gap-10">
                    <div className="border-l border-[#EBEDF1] h-18 mx-4"></div>

                    <ControlIcon
                        icon={isMicrophoneEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                        label="Mic"
                        onClick={toggleMic}
                    />
                    <ControlIcon
                        icon={isCameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                        label="Cam"
                        onClick={toggleCam}
                    />
                    <ControlIcon icon={<MonitorUp size={20} />} label="Display" onClick={toggleScreen} />
                    <ControlIcon icon={<Hand size={20} />} label="Hand" />
                    <ControlIcon icon={<Smile size={20} />} label="Emoji" />
                    <ControlIcon icon={<Languages size={20} />} label="Transcript" />
                    {/* Divider */}
                    <div className="border-l border-[#EBEDF1] h-18 mx-4"></div>
                    {/* Leave Room Button */}

                    <ControlIcon icon={<PhoneOff size={20} />} label="Leave" />

                    {/* <button
                        onClick={leaveRoom}
                        className="flex flex-col items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2"
                    >
                        <PhoneOff size={20} />
                        <span className="text-xs">Leave</span>
                    </button> */}
                </div>

            </div>
        </div>
    );
}

function ControlIcon({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-black"
        >
            <div className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl shadow-md">{icon}</div>
            <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
    );
}
