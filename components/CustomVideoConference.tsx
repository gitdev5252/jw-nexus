"use client";

import {
    GridLayout,
    ParticipantTile,
    useRoomContext,
    useTracks,
    useLocalParticipant,
    useParticipants,
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
    const participants = useParticipants();

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
console.log("Tracks:", tracks);
    const leaveRoom = async () => {
        await room.disconnect();
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white p-2 sm:p-4 text-black">
            <div className="text-left text-lg font-semibold py-2">
                Friends Catch Up Call
            </div>

            {/* Participant Grid */}
            <div className="flex-1 overflow-hidden">
                <GridLayout tracks={tracks} className="w-full h-full gap-2 sm:gap-4">
                    <ParticipantTile className="w-full h-full object-cover rounded-lg overflow-hidden" />
                </GridLayout>
            </div>

            {/* Bottom Control Bar */}
            <div className="flex items-center justify-center sm:justify-end px-2 sm:px-10 py-3">
                <div className="flex flex-wrap gap-6 sm:gap-10 justify-center">
                    <ControlIcon
                        icon={
                            isMicrophoneEnabled ? (
                                <Mic size={20} />
                            ) : (
                                <MicOff size={20} />
                            )
                        }
                        label="Mic"
                        onClick={toggleMic}
                    />
                    <ControlIcon
                        icon={
                            isCameraEnabled ? (
                                <Video size={20} />
                            ) : (
                                <VideoOff size={20} />
                            )
                        }
                        label="Cam"
                        onClick={toggleCam}
                    />
                    <ControlIcon
                        icon={<MonitorUp size={20} />}
                        label="Display"
                        onClick={toggleScreen}
                    />
                    <ControlIcon icon={<Hand size={20} />} label="Hand" />
                    <ControlIcon icon={<Smile size={20} />} label="Emoji" />
                    <ControlIcon
                        icon={<Languages size={20} />}
                        label="Transcript"
                    />
                    <ControlIcon
                        icon={<PhoneOff size={20} />}
                        label="Leave"
                        onClick={leaveRoom}
                    />
                </div>
            </div>
        </div>
    );
}

function ControlIcon({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-black"
        >
            <div className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl shadow-md">
                {icon}
            </div>
            <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
    );
}
