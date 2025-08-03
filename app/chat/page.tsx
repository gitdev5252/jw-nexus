'use client';
import React from 'react';
import Image from 'next/image';
import { LeftSidebar } from '@/lib/LeftSidebar';
import ChatLayout from './ChatLayout';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = React.useState('profile');
    return (
        <div className="flex items-center justify-start bg-white text-black">
            <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <ChatLayout />
        </div>
    );
};
export default ProfilePage;
