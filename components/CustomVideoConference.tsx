"use client";

import {
    useRoomContext,
    useTracks,
    useLocalParticipant,
    useParticipants,
    AudioTrack,
} from "@livekit/components-react";
import { Track, RoomEvent } from "livekit-client";
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
// import React from "react";
// import React from "react";
import React from "react";
import { ParticipantVideo } from "./ParticipantVideo";
import { ScreenShareVideo } from "./ScreenShareVideo";
//
export default function CustomVideoConference() {
    const room = useRoomContext();
    const { localParticipant } = useLocalParticipant();
    const participants = useParticipants();

    const isMicrophoneEnabled = localParticipant?.isMicrophoneEnabled ?? false;
    const isCameraEnabled = localParticipant?.isCameraEnabled ?? false;
    const initialStart = typeof window !== "undefined"
        ? localStorage.getItem("meetingStart")
        : null;

    // const [meetingStartTime, setMeetingStartTime] = React.useState<Date | null>(
    //     initialStart ? new Date(initialStart) : null
    // );
    const [handRaised, setHandRaised] = React.useState(false);
    const [remoteHands, setRemoteHands] = React.useState<Record<string, boolean>>({});
    const [remoteEmojis, setRemoteEmojis] = React.useState<Record<string, string>>({});

    // const [elapsedTime, setElapsedTime] = React.useState(() => {
    //     if (initialStart) {
    //         const now = new Date();
    //         const diff = now.getTime() - new Date(initialStart).getTime();
    //         const hours = Math.floor(diff / (1000 * 60 * 60));
    //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    //         return `${hours.toString().padStart(2, "0")}:${minutes
    //             .toString()
    //             .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    //     }
    //     return "00:00:00";
    // });

    const localVideoRef = React.useRef<HTMLVideoElement>(null);

    // Start meeting timer
    // React.useEffect(() => {
    //     if (room.state === "connected" && !meetingStartTime) {
    //         setMeetingStartTime(new Date());
    //     }
    // }, [room.state, meetingStartTime]);
    // React.useEffect(() => {
    //     if (room.state === "connected") {
    //         const saved = localStorage.getItem("meetingStart");
    //         if (saved) {
    //             setMeetingStartTime(new Date(saved));
    //         } else {
    //             const now = new Date();
    //             setMeetingStartTime(now);
    //             localStorage.setItem("meetingStart", now.toISOString());
    //         }
    //     }
    // }, [room.state]);

    // React.useEffect(() => {
    //     if (!meetingStartTime) return;
    //     const timer = setInterval(() => {
    //         const now = new Date();
    //         const diff = now.getTime() - meetingStartTime.getTime();
    //         const hours = Math.floor(diff / (1000 * 60 * 60));
    //         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    //         setElapsedTime(
    //             `${hours.toString().padStart(2, "0")}:${minutes
    //                 .toString()
    //                 .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    //         );
    //     }, 1000);

    //     room.on(RoomEvent.Disconnected, () => clearInterval(timer));
    //     return () => clearInterval(timer);
    // }, [meetingStartTime, room]);

    const [meetingStartTime, setMeetingStartTime] = React.useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = React.useState("00:00:00");

    React.useEffect(() => {
        if (room.state === "connected") {
            // Check if we already have a start time in this session
            const savedStart = sessionStorage.getItem("meetingStart");
            if (savedStart) {
                setMeetingStartTime(new Date(savedStart));
            } else {
                const now = new Date();
                sessionStorage.setItem("meetingStart", now.toISOString());
                setMeetingStartTime(now);
            }
        } else {
            setMeetingStartTime(null);
            sessionStorage.removeItem("meetingStart");
        }
    }, [room.state]);

    React.useEffect(() => {
        if (!meetingStartTime) return;

        const timer = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - meetingStartTime.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setElapsedTime(
                `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        }, 1000);

        return () => clearInterval(timer);
    }, [meetingStartTime]);

    // On leave, clear session
    const leaveRoom = async () => {
        sessionStorage.removeItem("meetingStart");
        await room.disconnect();
        window.location.href = "/";
    };

    // Attach local video
    React.useEffect(() => {
        const cameraPub = localParticipant?.getTrackPublication(Track.Source.Camera);
        const videoEl = localVideoRef.current;
        if (cameraPub?.track && videoEl) {
            cameraPub.track.detach();
            cameraPub.track.attach(videoEl);
            return () => {
                cameraPub?.track?.detach(videoEl);
            };
        }
    }, [localParticipant, isCameraEnabled]);

    // LiveKit-managed remote tracks
    const remoteTracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: true }
    );

    const audioTracks = useTracks(
        [{ source: Track.Source.Microphone, withPlaceholder: false }],
        { onlySubscribed: true }
    );

    // Control handlers
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
    // const leaveRoom = async () => {
    //     localStorage.removeItem("meetingStart");

    //     await room.disconnect();
    //     window.location.href = "/";
    // };
    const localTrack = localParticipant
        ?.getTrackPublication(Track.Source.Camera)
        ?.track;
    const toggleHand = () => {
        const newValue = !handRaised;
        setHandRaised(newValue);

        room.localParticipant.publishData(
            new TextEncoder().encode(JSON.stringify({ type: "hand", raised: newValue })),
            { reliable: true }
        );
    };
    const sendEmoji = () => {
        const emoji = "🙂";
        room.localParticipant.publishData(
            new TextEncoder().encode(JSON.stringify({ type: "emoji", value: emoji })),
            { reliable: true }
        );

        // Show it locally too
        setRemoteEmojis((prev) => ({ ...prev, [localParticipant?.sid ?? "me"]: emoji }));

        setTimeout(() => {
            setRemoteEmojis((prev) => {
                const newMap = { ...prev };
                delete newMap[localParticipant?.sid ?? "me"];
                return newMap;
            });
        }, 3000); // hide after 3 sec
    };

    React.useEffect(() => {
        const handleData = (payload: Uint8Array, participant: any) => {
            try {
                const msg = JSON.parse(new TextDecoder().decode(payload));
                if (msg.type === "hand") {
                    setRemoteHands((prev) => ({
                        ...prev,
                        [participant.sid]: msg.raised,
                    }));
                }
            } catch (err) {
                console.error("Failed to parse data", err);
            }
        };

        room.on(RoomEvent.DataReceived, handleData);
        return () => {
            room.off(RoomEvent.DataReceived, handleData);
        };
    }, [room]);
    React.useEffect(() => {
        const handleData = (payload: Uint8Array, participant: any) => {
            try {
                const msg = JSON.parse(new TextDecoder().decode(payload));
                if (msg.type === "emoji") {
                    setRemoteEmojis((prev) => ({
                        ...prev,
                        [participant.sid]: msg.value,
                    }));
                    setTimeout(() => {
                        setRemoteEmojis((prev) => {
                            const newMap = { ...prev };
                            delete newMap[participant.sid];
                            return newMap;
                        });
                    }, 3000);
                }
            } catch (err) {
                console.error("Failed to parse data", err);
            }
        };

        room.on(RoomEvent.DataReceived, handleData);
        return () => {
            room.off(RoomEvent.DataReceived, handleData);
        };
    }, [room]);


    return (
        <div className="flex flex-col h-screen w-full bg-white p-2 sm:p-4 text-black relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
                <div className="text-left text-lg font-medium py-2">
                    Friends Catch Up Call
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-700">{elapsedTime}</div>
                    </div>
                </div>
            </div>

            {/* Main Video Area */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {remoteTracks.some(
                    (t) => t.publication?.source === Track.Source.ScreenShare
                ) ? (
                    // Someone sharing screen
                    <div className="flex-1 relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-[#A7A7A7]">
                        {remoteTracks
                            .filter((t) => t.publication?.source === Track.Source.ScreenShare)
                            .map((trackRef) => {
                                const track: any = trackRef.publication?.track;
                                return (
                                    <div key={trackRef.publication?.trackSid} className="relative w-full h-full">
                                        <ScreenShareVideo track={track} />

                                        {/* Fullscreen button */}
                                        <button
                                            onClick={() => {
                                                const videoElement = document.querySelector("video");
                                                if (videoElement && videoElement.requestFullscreen) {
                                                    videoElement.requestFullscreen();
                                                }
                                            }}
                                            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-md shadow"
                                            title="Fullscreen"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}

                    </div>
                ) : (
                    // Default local video
                    <div className="flex-1 relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-[#A7A7A7]">
                        {isCameraEnabled && localTrack ? (
                            <ParticipantVideo track={localTrack} />
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
                                    {localParticipant?.name?.[0]?.toUpperCase() || "?"}
                                </div>
                                <span className="mt-2 text-gray-700 font-medium">You</span>
                                <span className="text-xs text-gray-500">Camera is off</span>
                            </div>
                        )}
                        <div className="absolute top-2 left-2 bg-[#67696D]/60 text-white text-sm font-semibold px-4 py-2.5 rounded-md shadow flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                                {localParticipant?.name?.[0]?.toUpperCase() || "?"}
                            </div>
                            <span>You</span>
                        </div>


                        <button
                            onClick={() => {
                                const videoElement = document.querySelector("video");
                                if (videoElement && videoElement.requestFullscreen) {
                                    videoElement.requestFullscreen();
                                }
                            }}
                            className="absolute top-2 right-2 bg-[#67696D]/60 hover:bg-black/90 text-white p-3 rounded-md shadow"
                            title="Fullscreen"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                            </svg>
                        </button>
                    </div>

                )}

                {participants.filter((p) => p.sid !== localParticipant?.sid).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[25vh] overflow-y-auto">
                        {participants
                            .filter((p) => p.sid !== localParticipant?.sid)
                            .slice(0, participants.length === 5 ? 4 : 3)
                            .map((p) => {
                                const pub = p.getTrackPublication(Track.Source.Camera);
                                const track = pub?.track;
                                return (
                                    <div
                                        key={p.sid}
                                        className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-[#A7A7A7]"
                                    >
                                        {track ? (
                                            <>
                                                <ParticipantVideo track={track} />
                                                <button
                                                    onClick={() => {
                                                        const videoElement = document.querySelector("video");
                                                        if (videoElement && videoElement.requestFullscreen) {
                                                            videoElement.requestFullscreen();
                                                        }
                                                    }}
                                                    className="absolute top-2 right-2 bg-[#67696D]/60 hover:bg-black/90 text-white p-3 rounded-md shadow"
                                                    title="Fullscreen"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                                                    </svg>
                                                </button>

                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-600">
                                                    {p.name?.[0]?.toUpperCase() || "?"}
                                                    {remoteHands[p.sid] && (
                                                        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-xs font-bold shadow">
                                                            ✋
                                                        </div>
                                                    )}
                                                    {remoteEmojis[p.sid] && (
                                                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/80 rounded-full px-3 py-1 text-xl shadow animate-bounce">
                                                            {remoteEmojis[p.sid]}
                                                        </div>
                                                    )}


                                                </div>
                                                <span className="mt-2 text-gray-700 font-medium">
                                                    {p.name || "Guest"}
                                                </span>
                                                <span className="text-xs text-gray-500">Camera is off</span>
                                                <button
                                                    onClick={() => {
                                                        const videoElement = document.querySelector("video");
                                                        if (videoElement && videoElement.requestFullscreen) {
                                                            videoElement.requestFullscreen();
                                                        }
                                                    }}
                                                    className="absolute top-2 right-2 bg-[#67696D]/60 hover:bg-black/90 text-white p-3 rounded-md shadow"
                                                    title="Fullscreen"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                                                    </svg>
                                                </button>

                                            </div>

                                        )}

                                    </div>
                                );
                            })}

                        {participants.length > 4 && (
                            <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-white">
                                <div className="grid grid-cols-2 gap-2 p-2">
                                    {participants
                                        .filter((p) => p.sid !== localParticipant?.sid)
                                        .slice(3, 6)
                                        .map((p, idx) => (
                                            <div
                                                key={p.sid}
                                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700"
                                            >
                                                {p.name?.[0]?.toUpperCase() || "?"}
                                            </div>
                                        ))}
                                    {participants.filter((p) => p.sid !== localParticipant?.sid).length - 6 > 0 && (
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-500 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                                            +{participants.filter((p) => p.sid !== localParticipant?.sid).length - 6 > 0 ? participants.filter((p) => p.sid !== localParticipant?.sid).length - 6 : 0}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Audio for remote participants */}
            {audioTracks.map((trackRef: any) => (
                <AudioTrack
                    key={trackRef?.publication?.trackSid}
                    trackRef={trackRef}
                />
            ))}

            {/* Control Bar */}
            <div className="w-full h-px bg-gray-300 my-4"></div>
            <div className="flex items-center justify-center sm:justify-end px-2 sm:px-10 py-3">
                <div className="flex flex-wrap gap-6 sm:gap-10 justify-center">
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
                    <ControlIcon
                        icon={<MonitorUp size={20} />}
                        label="Display"
                        onClick={toggleScreen}
                    />
                    <ControlIcon
                        icon={<Hand size={20} color={handRaised ? "blue" : "black"} />}
                        label={handRaised ? "Lower" : "Raise"}
                        onClick={toggleHand}
                    />
                    <ControlIcon
                        icon={<Smile size={20} />}
                        label="Emoji"
                        onClick={sendEmoji}
                    />
                    <ControlIcon icon={<Languages size={20} />} label="Transcript" />
                    <div className="w-px h-18 bg-gray-300 mx-8"></div>
                    <ControlIcon
                        icon={<PhoneOff size={20} color="white" />}
                        label="Leave"
                        onClick={leaveRoom}
                        bgColor="bg-red-500"
                        hoverColor="hover:bg-red-600"
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
    bgColor = "bg-gray-100",
    hoverColor = "hover:bg-gray-200",
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    bgColor?: string;
    hoverColor?: string;
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-black"
        >
            <div className={`${bgColor} ${hoverColor} p-3 rounded-xl shadow-md`}>
                {icon}
            </div>
            <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
    );
}
