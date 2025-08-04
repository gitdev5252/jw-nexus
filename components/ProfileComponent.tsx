'use client';
import React from 'react';
import Image from 'next/image';
const ProfilePage = () => {
  const contactInfo = [
    {
      icon: '/images/icons/phone.svg',
      info: '+380971301757',
    },
    {
      icon: '/images/icons/envelop.svg',
      info: 'andreybabak101@gmail.com',
    },
  ];
  return (
    <div className="flex items-start justify-start bg-white text-black h-screen">
      <div className="!text-[#262A35] rounded-[26px] mx-[30px] p-[20px] mt-[20px] bg-[rgba(248,248,248,0.7)] border border-[#E0E3E8] flex flex-wrap flex-col items-center justify-center max-w-[335px]">
        <div className="!bg-white p-[10px] flex items-center justify-center flex-col w-full rounded-[20px] border border-[#EBEDF1]">
          <img
            src="/images/avatars/default-man.png"
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-lg mt-[20px]"
          />
          <h4 className="text-[24px] font-bold mt-[10px]">Jerome Savvy</h4>
          <div className="flex mb-4">
            <Image
              src={'/images/icons/location.svg'}
              alt="Location"
              width={16}
              height={16}
              className="inline-block mr-1"
            />
            <p className="text-[14px]">Rivne, Ukraine</p>
          </div>
          <div>
            {contactInfo.map(({ icon, info }, index) => (
              <div
                key={index}
                className="flex items-center mt-2 rounded-[20px] border border-[#E0E3E8] p-[10px]"
              >
                <Image
                  src={icon}
                  alt={info}
                  width={35}
                  height={35}
                  className="inline-block bg-[#EAECEF] rounded-full p-[8px]"
                />
                <span className="ml-2">{info}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-[16px] font-bold mb-2">About</h1>
          <p className="text-gray-600 text-[12px]">
            The master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
            itself, because it is pleasure.
          </p>
          <p className="text-gray-600 text-[12px] mt-2">
            But because those who do not know how to pursue pleasure rationally encounter
            consequences that are extremely painful
          </p>
        </div>
      </div>
      <div className="p-[30px] flex flex-col border-l border-[#EBEDF1] h-screen">
        {/* <div>
          <h1 className="">Activity</h1>
        </div>
        <div>
          <h1>Photos</h1>
        </div>
        <div>
          <h1>Posts</h1>
        </div> */}
      </div>
    </div>
  );
};
export default ProfilePage;
