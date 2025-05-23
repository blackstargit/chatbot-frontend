// src/components/ChatWindow/Shared/OptionsMenu.jsx

import React from "react"; // Make sure React is imported here
import { ArrowCounterClockwise } from "@phosphor-icons/react"; // Only need ArrowCounterClockwise here
import SessionID from "./SessionID";
import ContactSupport from "./ContactSupport";

export default function OptionsMenu({ settings, showing, startNewChat, sessionId, menuRef }) {
  if (!showing) return null;

  return (
    <div
      ref={menuRef}
      className="allm-bg-white allm-absolute allm-z-10 allm-flex allm-flex-col allm-gap-y-1 allm-rounded-xl allm-shadow-lg allm-top-[64px] allm-right-[46px] allm-py-2"
    >
      {/* New Chat Button (replaces Reset Chat) */}
      <button
        onClick={startNewChat}
        className="hover:allm-cursor-pointer allm-bg-white allm-gap-x-[12px] hover:allm-bg-gray-100 allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-[#7A7D7E] allm-font-bold allm-px-4 allm-py-2"
        aria-label="Start a new chat"
      >
        <ArrowCounterClockwise size={24} />
        <p className="allm-text-[14px]">New Chat</p>
      </button>

      {/* Placeholder for Chat Sound Toggle */}
      <button
        // onClick={toggleChatSound} // Implement this later
        className="hover:allm-cursor-pointer allm-bg-white allm-gap-x-[12px] hover:allm-bg-gray-100 allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-[#7A7D7E] allm-font-bold allm-px-4 allm-py-2"
        aria-label="Toggle chat sounds"
      >
        {/* Placeholder for Sound Icon */}
        <svg className="allm-w-6 allm-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.386 1.846A1 1 0 0110 1h4a1 1 0 011 1v12a1 1 0 01-1 1h-4a1 1 0 01-.614-.154L5 12V4l4.386-2.154zM9 13.5l-3 1.5V5l3-1.5v10z"></path>
        </svg>
        <p className="allm-text-[14px]">Chat Sound</p>
      </button>

      {/* Placeholder for Change Language */}
      <button
        // onClick={handleChangeLanguage} // Implement this later
        className="hover:allm-cursor-pointer allm-bg-white allm-gap-x-[12px] hover:allm-bg-gray-100 allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-[#7A7D7E] allm-font-bold allm-px-4 allm-py-2"
        aria-label="Change language"
      >
        {/* Placeholder for Language Icon */}
        <svg className="allm-w-6 allm-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5.466l.732-1.465A8.025 8.025 0 0110 4a8.025 8.025 0 013.802 2.535L14.534 9H13a1 1 0 000 2h1.534l-.732 1.465A8.025 8.025 0 0110 16a8.025 8.025 0 01-3.802-2.535L5.466 11H7a1 1 0 100-2z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="allm-text-[14px]">Change Language</p>
      </button>

      <ContactSupport email={settings.supportEmail} />
      <SessionID sessionId={sessionId} />
    </div>
  );
}
