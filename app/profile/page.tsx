'use client';
import React from 'react';
import Image from 'next/image';
import { LeftSidebar } from '@/lib/LeftSidebar';
const ProfilePage = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const contactInfo = {
    email: 'andreybabak101@gmail.com',
    phone: '+380971301757',
  };
  return (
    <div className="flex items-center justify-start bg-white text-black">
      <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="!text-[#262A35] rounded-[26px] mx-[30px] p-[20px] bg-[rgba(248,248,248,0.7)] border border-[#E0E3E8] flex flex-wrap flex-col items-center justify-center max-w-[335px]">
        <div className="!bg-white p-[10px] flex items-center justify-center flex-col w-full rounded-[20px] border border-[#EBEDF1]">
          <Image
            src="/images/avatars/default-man.png"
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-lg mt-[20px]"
          />
          <h4 className="text-[24px] font-bold mt-[10px]">Jerome Savvy</h4>
          <div className="flex flex-col flex-wrap items-center justify-center mt-[10px]">
            <Image
              src={'/images/icons/location.svg'}
              alt="Location"
              width={16}
              height={16}
              className="inline-block mr-1"
            />
            <p className="text-[14px]">Rivne, Ukraine</p>
            <div className="mb-[20px]">
              {Object.entries(contactInfo).map(([key, value], index) => (
                <div key={index} className="flex items-center mt-2">
                  <span className="font-bold">{key}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-[16px] font-bold mb-2">About</h1>
          <p className="text-gray-600 text-[12px]">
            The master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
            itself, because it is pleasure.{' '}
            <span className="mb-1">
              But because those who do not know how to pursue pleasure rationally encounter
              consequences that are extremely painful
            </span>
          </p>
        </div>
      </div>
      <div className="rounded-[26px] mx-[30px] p-[20px] flex flex-col">
        This is Activity Feed content.
      </div>
    </div>
  );
};
export default ProfilePage;
