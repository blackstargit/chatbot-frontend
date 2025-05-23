import React from "react";

import AnythingLLMIcon from "@/assets/anything-llm-icon.svg";

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

export default MessageListItem;