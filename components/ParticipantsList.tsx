
'use client';

import React from 'react';
import {
    useParticipants,
    useRoomContext,
} from '@livekit/components-react';
import { Mic, MicOff, Video, VideoOff, Copy } from 'lucide-react';
import { callDetailsOptions } from '@/constants/data';

export default function ParticipantsList() {
    const room = useRoomContext();
    const participants = useParticipants();

    // Function to get initials from name
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

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
    };

    return (
        <div className="w-full h-full bg-[#F8F8F8] p-2 rounded-2xl flex flex-col">
            {/* Header */}
            <div className="text-xs font-medium text-gray-500 mb-4 tracking-wider ml-2 mt-2">
                {participants.length} PARTICIPANTS
            </div>

            {/* Participants List - Scrollable */}
            <div className="flex-1 overflow-y-auto mb-4">
                <div className="space-y-3 bg-white p-4 rounded-2xl shadow-sm">
                    {participants.map((participant, index) => (
                        <div
                            key={participant.sid}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className={`w-5 h-5 rounded-full ${getAvatarColor(participant.name || 'User')} flex items-center justify-center text-white text-sm font-medium`}>
                                    {participant.name ? getInitials(participant.name) : 'U'}
                                </div>

                                {/* Name */}
                                <span className="text-gray-900 font-medium text-base">
                                    {participant.name || 'Unknown User'}
                                </span>
                            </div>

                            {/* Status Icons */}
                            <div className="flex items-center gap-2">
                                {/* Microphone Status */}
                                {/* <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-call-gradient blur-[5px] ${participant.isMicrophoneEnabled
                                        ? 'bg-green-100'
                                        : 'bg-gray-100'
                                    }`}>
                                    {participant.isMicrophoneEnabled ? (
                                        <Mic size={16} className="text-green-600" />
                                    ) : (
                                        <MicOff size={16} className="text-gray-400" />
                                    )}
                                </div> */}
                                <div className={`w-8 h-8 rounded-full border border-[#EBEDF1] flex items-center justify-center relative ${participant.isMicrophoneEnabled ? 'bg-white' : 'bg-call-gray-100'}`}>
                                    {participant.isMicrophoneEnabled && (
                                        <div className="absolute inset-0 w-[26px] h-[26px] left-[3px] top-[4px] bg-call-gradient blur-[4px] rounded-full"></div>
                                    )}
                                    {participant.isMicrophoneEnabled ? (
                                        <Mic className="w-[18px] h-[18px] text-call-text relative z-10" strokeWidth={1} color='#262A35' />
                                    ) : (
                                        <MicOff className="w-[18px] h-[18px] text-call-text/50" strokeWidth={1} color='#262A35' />
                                    )}
                                </div>
                                {/* Camera Status */}
                                <div className={`w-8 h-8 rounded-full border border-[#EBEDF1] flex items-center justify-center relative ${participant.isCameraEnabled ? 'bg-white' : 'bg-call-gray-100'}`}>
                                    {participant.isCameraEnabled && (
                                        <div className="absolute inset-0 w-[26px] h-[26px] left-[3px] top-[4px] bg-call-gradient blur-[4px] rounded-full"></div>
                                    )}
                                    {participant.isCameraEnabled ? (
                                        <Video className="w-[18px] h-[18px] text-call-text relative z-10" strokeWidth={1} color='#262A35' />
                                    ) : (
                                        <VideoOff className="w-[18px] h-[18px] text-call-text/50" strokeWidth={1} color='#262A35' />
                                    )}
                                </div>

                                {/* <div className={`w-8 h-8 rounded-full flex items-center justify-center ${participant.isCameraEnabled
                                    ? 'bg-blue-100'
                                    : 'bg-gray-100'
                                    }`}>
                                    {participant.isCameraEnabled ? (
                                        <Video size={16} className="text-blue-600" />
                                    ) : (
                                        <VideoOff size={16} className="text-gray-400" />
                                    )}
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* URL Section - Sticky at bottom */}
            <div className="mt-auto">
                <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71" />
                            </svg>
                        </div>
                        <span className="text-gray-600 text-sm font-medium truncate">
                            {typeof window !== 'undefined' ? window.location.href.replace('http://', '').replace('https://', '') : 'Loading...'}
                        </span>
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <Copy size={14} className="text-gray-500" />
                        <span className="text-gray-600 text-sm font-medium">Copy</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
