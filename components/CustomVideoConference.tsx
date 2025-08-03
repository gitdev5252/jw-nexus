// "use client";

// import {
//     GridLayout,
//     ParticipantTile,
//     useRoomContext,
//     useTracks,
//     useLocalParticipant,
//     useParticipants,
//     ParticipantName,
//     LiveKitRoom,
//     TrackLoop,
// } from "@livekit/components-react";
// import { Track } from "livekit-client";
// import {
//     Mic,
//     MicOff,
//     Video,
//     VideoOff,
//     MonitorUp,
//     PhoneOff,
//     Hand,
//     Smile,
//     Languages,
// } from "lucide-react";
// import React from "react";
// import { AudioTrack } from '@livekit/components-react';

// export default function CustomVideoConference() {
//     const room = useRoomContext();
//     const { localParticipant } = useLocalParticipant();
//     const participants = useParticipants();
//     const { isMicrophoneEnabled, isCameraEnabled } = room.localParticipant;
//     const localVideoRef = React.useRef<HTMLVideoElement>(null);

//     // State for real-time tracking
//     const [currentTime, setCurrentTime] = React.useState(new Date());
//     const [meetingStartTime, setMeetingStartTime] = React.useState<Date | null>(null);
//     const [elapsedTime, setElapsedTime] = React.useState('00:00:00');

//     // Set meeting start time when room connects
//     React.useEffect(() => {
//         if (room.state === 'connected' && !meetingStartTime) {
//             setMeetingStartTime(new Date());
//         }
//     }, [room.state, meetingStartTime]);

//     // Update current time every second
//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     // Calculate elapsed time
//     React.useEffect(() => {
//         if (meetingStartTime) {
//             const timer = setInterval(() => {
//                 const now = new Date();
//                 const diff = now.getTime() - meetingStartTime.getTime();

//                 const hours = Math.floor(diff / (1000 * 60 * 60));
//                 const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//                 const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//                 setElapsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//             }, 1000);

//             return () => clearInterval(timer);
//         }
//     }, [meetingStartTime]);

//     // Format current date
//     const formatDate = (date: Date) => {
//         const options: Intl.DateTimeFormatOptions = {
//             day: '2-digit',
//             month: 'long',
//             year: 'numeric'
//         };
//         return date.toLocaleDateString('en-US', options);
//     };

//     const tracks = useTracks(
//         [
//             { source: Track.Source.Camera, withPlaceholder: true },
//             { source: Track.Source.ScreenShare, withPlaceholder: false },
//         ],
//         { onlySubscribed: false }
//     ) || [];
//     // Get microphone tracks of remote participants
//     const audioTracks = useTracks(
//         [{ source: Track.Source.Microphone, withPlaceholder: false }],
//         { onlySubscribed: true }
//     );

//     React.useEffect(() => {
//         const cameraPub = localParticipant?.getTrackPublication(Track.Source.Camera);
//         const videoEl = localVideoRef.current;

//         if (cameraPub?.track && videoEl) {
//             cameraPub.track.detach();
//             cameraPub.track.attach(videoEl);
//         }
//     }, [localParticipant, isCameraEnabled]);

//     const toggleMic = async () => {
//         await room.localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
//     };

//     const toggleCam = async () => {
//         await room.localParticipant.setCameraEnabled(!isCameraEnabled);
//     };

//     const toggleScreen = async () => {
//         try {
//             await room.localParticipant.setScreenShareEnabled(
//                 !room.localParticipant.isScreenShareEnabled
//             );
//         } catch (e) {
//             console.error("Screen Share Failed:", e);
//         }
//     };

//     const leaveRoom = async () => {
//         await room.disconnect();
//         window.location.href = "/";
//     };
//     // React.useEffect(() => {
//     //     if (room.state === "connected") {
//     //         // Ensure local camera + mic are enabled
//     //         room.localParticipant.setCameraEnabled(true).catch(console.error);
//     //         room.localParticipant.setMicrophoneEnabled(true).catch(console.error);
//     //     }
//     // }, [room.state]);
//     React.useEffect(() => {
//         if (room.state === 'connected') {
//             room.localParticipant.setCameraEnabled(true).catch(console.error);
//         }
//     }, [room.state]);
//     const activeTracks = tracks.filter((t) => !!t.publication?.track);
//     const participantCount = activeTracks.length;
//     React.useEffect(() => {
//         if (room.state === "connected") {
//             const micPub = localParticipant.getTrackPublication(Track.Source.Microphone);
//             if (!micPub || !micPub.isSubscribed) {
//                 localParticipant.setMicrophoneEnabled(true).catch(console.error);
//             }
//         }
//     }, [room.state, localParticipant]);
//     console.log("Mic toggled:", {
//         micEnabled: localParticipant.isMicrophoneEnabled,
//         tracks: localParticipant.tracks
//     });
//     React.useEffect(() => {
//         if (room.state === "connected") {
//             localParticipant.setMicrophoneEnabled(true).catch(console.error);
//         }
//     }, [room.state, localParticipant]);


//     return (
//         <div className="flex flex-col h-screen w-full bg-white p-2 sm:p-4 text-black">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
//                 <div className="text-left text-lg font-medium py-2">
//                     Friends Catch Up Call
//                 </div>
//                 <div className="flex items-center gap-4">
//                     {/* Calendar with Date */}
//                     <div className="flex items-center gap-2">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
//                             <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                             <line x1="16" y1="2" x2="16" y2="6" />
//                             <line x1="8" y1="2" x2="8" y2="6" />
//                             <line x1="3" y1="10" x2="21" y2="10" />
//                         </svg>
//                         <div className="text-sm font-medium text-gray-700">
//                             {formatDate(currentTime)}
//                         </div>
//                     </div>

//                     {/* Clock with Time */}
//                     <div className="flex items-center gap-2">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
//                             <circle cx="12" cy="12" r="10" />
//                             <polyline points="12,6 12,12 16,14" />
//                         </svg>
//                         <div className="text-sm font-medium text-gray-700">
//                             {elapsedTime}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Participant Grid */}
//             <div
//                 className={`grid gap-4 w-full h-full
//     ${participants.length === 1 ? "grid-cols-1" : ""}
//     ${participants.length === 2 ? "grid-cols-2" : ""}
//     ${participants.length >= 3 ? "grid-cols-2 md:grid-cols-3" : ""}
//   `}
//             >
//                 {participants.map((participant) => {
//                     const isLocal = participant.sid === localParticipant?.sid;

//                     // Find camera track for this participant
//                     const cameraTrackRef = tracks.find(
//                         (t) =>
//                             t.participant.sid === participant.sid &&
//                             t.publication?.source === Track.Source.Camera
//                     );
//                     const mediaTrack = cameraTrackRef?.publication?.track;

//                     return (
//                         <div
//                             key={participant.sid}
//                             className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-[#A7A7A7]"
//                         >
//                             {mediaTrack && mediaTrack.isEnabled ? (
//                                 <video
//                                     // ref={(el) => {
//                                     //     if (el) {
//                                     //         // First clear any previous attaches
//                                     //         mediaTrack.detach();
//                                     //         mediaTrack.attach(el);

//                                     //         // When component unmounts, detach again
//                                     //         return () => {
//                                     //             mediaTrack.detach(el);
//                                     //         };
//                                     //     }
//                                     // }}
//                                     ref={localVideoRef}
//                                     autoPlay
//                                     muted={isLocal}
//                                     playsInline
//                                     className="w-full h-full object-cover"
//                                     data-participant-id={participant.sid}
//                                 />
//                             ) : (
//                                 <div className="flex flex-col items-center justify-center w-full h-full bg-[#A7A7A7]">
//                                     <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600">
//                                         {participant.name?.[0]?.toUpperCase() || "?"}
//                                     </div>
//                                     <span className="mt-2 text-gray-700 font-medium">
//                                         {isLocal ? "You" : participant.name || participant.identity || "Guest"}
//                                     </span>
//                                     <span className="text-xs text-gray-500">Camera is off</span>
//                                 </div>
//                             )}

//                             {/* Always show name badge */}
//                             <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
//                                 <span className="bg-[#68696e] text-white text-sm font-semibold p-2 py-3 px-6 rounded-lg shadow-sm">
//                                     {isLocal ? "You" : participant.name || participant.identity || "Guest"}
//                                 </span>
//                             </div>
//                         </div>
//                     );
//                 })}


//             </div>
//             {audioTracks.map((trackRef) => (
//                 <AudioTrack
//                     key={trackRef.publication.trackSid}
//                     trackRef={trackRef}
//                 />
//             ))}


//             {/* Bottom Control Bar */}
//             <div className="flex items-center justify-center sm:justify-end px-2 sm:px-10 py-3">
//                 <div className="flex flex-wrap gap-6 sm:gap-10 justify-center">
//                     <ControlIcon
//                         icon={
//                             isMicrophoneEnabled ? (
//                                 <Mic size={20} />
//                             ) : (
//                                 <MicOff size={20} />
//                             )
//                         }
//                         label="Mic"
//                         onClick={toggleMic}
//                     />
//                     <ControlIcon
//                         icon={
//                             isCameraEnabled ? (
//                                 <Video size={20} />
//                             ) : (
//                                 <VideoOff size={20} />
//                             )
//                         }
//                         label="Cam"
//                         onClick={toggleCam}
//                     />
//                     <ControlIcon
//                         icon={<MonitorUp size={20} />}
//                         label="Display"
//                         onClick={toggleScreen}
//                     />
//                     <ControlIcon icon={<Hand size={20} />} label="Hand" />
//                     <ControlIcon icon={<Smile size={20} />} label="Emoji" />
//                     <ControlIcon
//                         icon={<Languages size={20} />}
//                         label="Transcript"
//                     />

//                     {/* Divider */}
//                     <div className="w-px h-18 bg-gray-300 mx-8"></div>

//                     <ControlIcon
//                         icon={<PhoneOff size={20} />}
//                         label="Leave"
//                         onClick={leaveRoom}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ControlIcon({
//     icon,
//     label,
//     onClick,
// }: {
//     icon: React.ReactNode;
//     label: string;
//     onClick?: () => void;
// }) {
//     return (
//         <button
//             onClick={onClick}
//             className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-black"
//         >
//             <div className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl shadow-md">
//                 {icon}
//             </div>
//             <span className="text-xs mt-1 font-medium">{label}</span>
//         </button>
//     );
// }
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

    const [meetingStartTime, setMeetingStartTime] = React.useState<Date | null>(
        initialStart ? new Date(initialStart) : null
    );

    const [elapsedTime, setElapsedTime] = React.useState(() => {
        if (initialStart) {
            const now = new Date();
            const diff = now.getTime() - new Date(initialStart).getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
        return "00:00:00";
    });

    const localVideoRef = React.useRef<HTMLVideoElement>(null);

    // Start meeting timer
    // React.useEffect(() => {
    //     if (room.state === "connected" && !meetingStartTime) {
    //         setMeetingStartTime(new Date());
    //     }
    // }, [room.state, meetingStartTime]);
    React.useEffect(() => {
        if (room.state === "connected") {
            const saved = localStorage.getItem("meetingStart");
            if (saved) {
                setMeetingStartTime(new Date(saved));
            } else {
                const now = new Date();
                setMeetingStartTime(now);
                localStorage.setItem("meetingStart", now.toISOString());
            }
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

        room.on(RoomEvent.Disconnected, () => clearInterval(timer));
        return () => clearInterval(timer);
    }, [meetingStartTime, room]);

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
    const toggleEmoji = async () => {
        // await room.localParticipant.setCameraEnabled(!isCameraEnabled);
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
        localStorage.removeItem("meetingStart");

        await room.disconnect();
        window.location.href = "/";
    };
    const localTrack = localParticipant
        ?.getTrackPublication(Track.Source.Camera)
        ?.track;

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
                                const track = trackRef.publication?.track;
                                return (
                                    <video
                                        key={trackRef.publication?.trackSid}
                                        ref={(el) => {
                                            if (el && track) {
                                                track.detach();
                                                track.attach(el);
                                            }
                                        }}
                                        autoPlay
                                        playsInline
                                        className="absolute top-0 left-0 w-full h-full object-contain"
                                    />
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
                    </div>
                )}

                {/* Remote participants grid */}
                {participants.filter((p) => p.sid !== localParticipant?.sid).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[25vh] overflow-y-auto">
                        {participants
                            .filter((p) => p.sid !== localParticipant?.sid)
                            .map((p) => {
                                const pub = p.getTrackPublication(Track.Source.Camera);
                                const track = pub?.track;
                                return (
                                    <div
                                        key={p.sid}
                                        className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-[#A7A7A7]"
                                    >
                                        {track ? (
                                            <ParticipantVideo track={track} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full h-full">
                                                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-600">
                                                    {p.name?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <span className="mt-2 text-gray-700 font-medium">
                                                    {p.name || "Guest"}
                                                </span>
                                                <span className="text-xs text-gray-500">Camera is off</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

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
                    <ControlIcon icon={<Hand size={20} />} label="Hand" />
                    <ControlIcon icon={<Smile size={20} />} label="Emoji" />
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
