// src/components/ChatWindow/MessagesPage/index.jsx

import React from "react";
import { v4 as uuidv4 } from "uuid";

// Shared Components - assuming these are in src/components/ChatWindow/Shared/
import AnythingLLMIcon from "@/assets/anything-llm-icon.svg"; // Bot icon
import Sponsor from "../../Sponsor";
import NavigationBar from "../Shared/Footer";

// Helper component for a message item (similar to RecentMessageCard but for this page)
const MessageListItem = ({ title, subtitle, timeAgo, icon, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-md allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200"
      onClick={onClick}
    >
      <div className="allm-flex allm-items-center">
        <img
          src={icon || AnythingLLMIcon} // Use provided icon or default
          alt="Chat Icon"
          className="allm-w-10 allm-h-10 allm-rounded-full allm-flex allm-items-center allm-justify-center allm-mr-3 allm-object-cover"
        />
        <div>
          <p className="allm-text-gray-800 allm-font-semibold allm-text-base">{title}</p>
          <p className="allm-text-gray-500 allm-text-sm">
            {subtitle} - {timeAgo}
          </p>
        </div>
      </div>
      <svg className="allm-w-5 allm-h-5 allm-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

// Helper component for the "Ask a question" button
const AskQuestionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="allm-flex allm-items-center allm-justify-center allm-bg-gray-800 allm-text-white allm-font-semibold allm-py-3 allm-px-6 allm-rounded-full allm-shadow-lg hover:allm-bg-gray-700 active:allm-bg-gray-900 allm-transition-colors allm-duration-200 allm-gap-x-2 allm-self-center allm-w-fit"
    >
      <span>Ask a question</span>
      <svg className="allm-w-5 allm-h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1zm0 4a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

const MessagesPage = ({ onStartNewChat, onNavClick, activeScreen, onNavigate, settings }) => {
  const handleMessageClick = (sessionId) => {
    onNavigate(`chat/${sessionId}`);
  };

  const handleAskQuestionClick = () => {
    onStartNewChat();
  };

  const dummyMessages = [
    {
      sessionId: uuidv4(),
      title: "AI tools by Alphabase",
      subtitle: "Fin",
      timeAgo: "1h ago",
      icon: AnythingLLMIcon, // Assuming this is the icon used for the sender/bot
    },
    // You can add more dummy messages here for scrolling if needed
    // {
    //   sessionId: uuidv4(),
    //   title: 'Next Project Ideas',
    //   subtitle: 'You',
    //   timeAgo: 'Yesterday',
    //   icon: 'path/to/user-icon.png',
    // },
  ];

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-bg-gray-100 allm-relative">
      {/* Header */}
      <div className="allm-bg-white allm-p-5 allm-shadow-sm allm-text-center allm-font-bold allm-text-lg allm-border-b allm-border-gray-200">Messages</div>

      {/* Main content area */}
      <div className="allm-flex-grow allm-overflow-y-auto allm-p-4 allm-space-y-4 allm-pb-[140px]">
        {" "}
        {/* Adjusted pb for footer components */}
        {dummyMessages.map((message) => (
          <MessageListItem
            key={message.sessionId}
            title={message.title}
            subtitle={message.subtitle}
            timeAgo={message.timeAgo}
            icon={message.icon}
            onClick={() => handleMessageClick(message.sessionId)}
          />
        ))}
        {/* This "Ask a question" button is centrally located on the Messages page */}
        <div className="allm-flex allm-justify-center allm-mt-6">
          <AskQuestionButton onClick={handleAskQuestionClick} />
        </div>
      </div>

      <div className="allm-flex allm-flex-col allm-gap-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <NavigationBar
          activeScreen="messages"
          onNavClick={(screen) => {
            if (screen === "home") {
              closeChat();
            }
          }}
        />
        <div className="allm-py-2.5">
          <Sponsor settings={settings} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
