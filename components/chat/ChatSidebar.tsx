import React, { useContext } from 'react';
// import { ChatContext } from '../../contexts/ChatContext';

const ChatSidebar: React.FC = () => {
  // const { contacts, selectContact } = useContext(ChatContext);
  const contacts = [
    { id: 1, name: 'Alice', lastMessage: 'Hey there!', img: '/images/avatars/Brenda.png' },
    { id: 2, name: 'Bob', lastMessage: 'See you later!', img: '/images/avatars/Peter.png' },
  ];

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 border-r h-100% border-gray-300 overflow-y-auto p-[24px]">
      <div className="p-4 text-[24px]">Message</div>
      <div className="flex items-center border-[2px] border-gray-300 rounded-[20px] pl-[10px]">
        <img
          src="/images/icons/magnifying-glass.svg"
          alt="Logo"
          className="w-[30px] h-[30px] rounded-full"
        />
        <input
          className="w-full h-[46px] pl-[10px] border-none focus:outline-none focus:border-none"
          placeholder="Search..."
        />
      </div>
      <div>
        <div className="flex items-center gap-[10px] mt-[20px]">
          <img src="/images/icons/office-pin.svg" alt="Pinned" className="w-[14px] h-[14px]" />
          <p className="text-[12px] font-bold text-gray-500">PINNED CHATS</p>
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-[10px] p-[10px] hover:bg-gray-100 cursor-pointer justify-between"
          >
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[42px] h-[42px] rounded-[50%]"
                alt={contact.name}
                src={contact.img}
              />
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <span className="text-sm text-gray-500">{contact.lastMessage}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500"> 8:14 </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-[10px] mt-[20px]">
          <img src="/images/icons/inbox.svg" className="w-[14px] h-[14px]" />
          <p className="text-[12px] font-bold text-gray-500">ALL CHATS</p>
        </div>
        <div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-[10px] p-[10px] hover:bg-gray-100 cursor-pointer justify-between"
            >
              <div className="flex items-center gap-[10px]">
                <img
                  className="w-[42px] h-[42px] rounded-[50%]"
                  alt={contact.name}
                  src={contact.img}
                />
                <div>
                  <p className="font-semibold text-gray-800">{contact.name}</p>
                  <span className="text-sm text-gray-500">{contact.lastMessage}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500"> 8:14 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
