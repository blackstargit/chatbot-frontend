import React from "react";
import { v4 as uuidv4 } from "uuid";

import AnythingLLMIcon from "@/assets/anything-llm-icon.svg";

import Sponsor from "@/components/Shared/Sponsor";
import NavigationBar from "@/components/Shared/NavigationBar";
import MessageListItem from "@/components/ChatWindow/MessagesPage/MessageListItem";
import AskQuestionButton from "@/components/ChatWindow/MessagesPage/AskQuestionButton";

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
        <NavigationBar activeScreen={activeScreen} onNavClick={onNavClick} />
        <Sponsor />
      </div>
    </div>
  );
};

export default MessagesPage;
