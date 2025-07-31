"use client";

import {
    GridLayout,
    ParticipantTile,
    useRoomContext,
    useTracks,
    useLocalParticipant,
    useParticipants,
    ParticipantName,
    LiveKitRoom,
    TrackLoop,
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
    const { localParticipant } = useLocalParticipant();
    const participants = useParticipants();
    const { isMicrophoneEnabled, isCameraEnabled } = room.localParticipant;

    // State for real-time tracking
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [meetingStartTime, setMeetingStartTime] = React.useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = React.useState('00:00:00');

    // Set meeting start time when room connects
    React.useEffect(() => {
        if (room.state === 'connected' && !meetingStartTime) {
            setMeetingStartTime(new Date());
        }
    }, [room.state, meetingStartTime]);

    // Update current time every second
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Calculate elapsed time
    React.useEffect(() => {
        if (meetingStartTime) {
            const timer = setInterval(() => {
                const now = new Date();
                const diff = now.getTime() - meetingStartTime.getTime();

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setElapsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [meetingStartTime]);

    // Format current date
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    ) || [];

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
    console.log(participants)
    return (
        <div className="flex flex-col h-screen w-full bg-white p-2 sm:p-4 text-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                <div className="text-left text-lg font-medium py-2">
                    Friends Catch Up Call
                </div>
                <div className="flex items-center gap-4">
                    {/* Calendar with Date */}
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <div className="text-sm font-medium text-gray-700">
                            {formatDate(currentTime)}
                        </div>
                    </div>

                    {/* Clock with Time */}
                    <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                        </svg>
                        <div className="text-sm font-medium text-gray-700">
                            {elapsedTime}
                        </div>
                    </div>
                </div>
            </div>

            {/* Participant Grid */}
            <div className="flex-1 overflow-hidden">
                <GridLayout tracks={tracks} className="w-full h-full gap-2 sm:gap-4">
                    <ParticipantTile className="w-full h-full object-cover rounded-lg overflow-hidden">
                        {/* {({ participants }) => {
                            console.log(participants,"participantsparticipants")
                            return (
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm font-medium">
                                    {participants?.sid === localParticipant?.sid ? "You" : (participants?.name || participants?.identity || "Anonymous")}
                                </div>
                            );
                        }} */}
                    </ParticipantTile>
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
                    
                    {/* Divider */}
                    <div className="w-px h-18 bg-gray-300 mx-8"></div>

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