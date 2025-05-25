import React from "react";
import { useTranslation } from "react-i18next";

// Assuming NavigationBar and Sponsor are still imported if not replaced by Figma code in those sections
import NavigationBar from "@/components/Shared/NavigationBar";
import Sponsor from "@/components/Shared/Sponsor";

const MessagesPage = ({ onNavigate, activeScreen, settings, onStartNewChat }) => {
  const { t } = useTranslation();

  const defaultSettings = {
    pageTitle: t("messages.title", { defaultValue: "Messages" }),
    askQuestionText: t("messages.ask_question", { defaultValue: "Ask a question" }),
    recentMessageData: {
      message: t("messages.recent_message.default_content", { defaultValue: "AI tools by Alphabase" }),
      sender: t("messages.recent_message.default_sender", { defaultValue: "Fin" }),
      timeAgo: t("messages.recent_message.default_time_ago", { defaultValue: "1h ago" }),
      sessionId: "default-recent-chat-id",
      brandImageUrl: settings?.brandImageUrl || "/placeholder-avatar.svg", // Provide a fallback
    },
    brandName: "Alphabase",
    homeNavText: t("nav.home", { defaultValue: "Home" }),
    messagesNavText: t("nav.messages", { defaultValue: "Messages" }),
    brandImageUrl: "/placeholder-logo.svg", // General brand image
  };

  const mergedSettings = {
    ...defaultSettings,
    ...(settings || {}),
    brandName: settings?.brandName || defaultSettings.brandName,
    brandImageUrl: settings?.brandImageUrl || defaultSettings.brandImageUrl,
    recentMessageData: settings?.recentMessageData
      ? {
          ...defaultSettings.recentMessageData,
          ...settings.recentMessageData,
          brandImageUrl: settings?.recentMessageData?.brandImageUrl || defaultSettings.recentMessageData.brandImageUrl,
        }
      : defaultSettings.recentMessageData,
  };

  const handleAskQuestionClick = () => {
    onStartNewChat();
  };

  const handleRecentMessageClick = (sessionId) => {
    onNavigate(`chat/${sessionId}`);
  };

  return (
    <div className="allm-h-full allm-inline-flex allm-flex-col allm-justify-between allm-items-start">
      {/* Header */}
      <div className="allm-self-stretch allm-px-16 allm-py-6 allm-border-b-[0.5px] allm-border-subtitle allm-flex allm-flex-col allm-justify-center allm-items-center allm-gap-3 allm-overflow-hidden">
        <div className="allm-text-center allm-justify-start allm-text-black-text allm-text-xl allm-font-normal">{mergedSettings.pageTitle}</div>
      </div>

      {/* Main content area - REFACTORED WITH FLEXBOX */}
      <div className="allm-w-full allm-flex-1 allm-flex allm-flex-col allm-border-b-[0.5px] allm-border-subtitle allm-overflow-hidden">
        {/* Outer flex container */}
        {/* Scrollable area for messages/content */}
        <div className="allm-flex-1 allm-overflow-y-auto allm-p-4">
          {/* Padding added for content spacing */}
          {/* Recent Message Card */}
          {/* Assuming you might map over a list of messages here. For a single item: */}
          <div
            className="allm-w-[--var(100%-24px)] allm-px-3 allm-py-4 allm-border-b-[0.20px] allm-border-subtitle allm-flex allm-justify-start allm-items-center allm-gap-3 allm-cursor-pointer hover:allm-bg-gray-100" // Use w-full, adjusted padding, added hover
            onClick={() => handleRecentMessageClick(mergedSettings.recentMessageData.sessionId)}
          >
            <div className="allm-w-10 allm-h-10 allm-relative allm-overflow-hidden allm-flex-shrink-0">
              {/* Make avatar round, prevent shrinking */}
              <img
                src={mergedSettings.recentMessageData.brandImageUrl}
                alt={mergedSettings.recentMessageData.sender}
                className="allm-w-full allm-h-full allm-object-cover"
              />
            </div>
            <div className="allm-flex allm-flex-col allm-flex-grow allm-min-w-0">
              <div className="allm-justify-start allm-text-black-text allm-text-base allm-font-normal allm-leading-snug allm-truncate">
                {mergedSettings.recentMessageData.sender} - {mergedSettings.recentMessageData.timeAgo}
              </div>
              <div className="allm-justify-start allm-text-subtitle allm-text-sm allm-font-normal allm-leading-snug allm-truncate">
                {/* Made subtitle smaller */}
                {mergedSettings.recentMessageData.message}
              </div>
            </div>
            <div className="allm-relative allm-ml-auto allm-flex-shrink-0">
              {/* Prevent arrow from shrinking */}
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.59636 15.5025C7.44019 15.5025 7.28401 15.45 7.16071 15.3375C6.92234 15.12 6.92234 14.76 7.16071 14.5425L12.52 9.6525C12.9146 9.2925 12.9146 8.7075 12.52 8.3475L7.16071 3.4575C6.92234 3.24 6.92234 2.88 7.16071 2.6625C7.39909 2.445 7.79364 2.445 8.03201 2.6625L13.3913 7.5525C13.8105 7.935 14.0489 8.4525 14.0489 9C14.0489 9.5475 13.8188 10.065 13.3913 10.4475L8.03201 15.3375C7.90872 15.4425 7.75254 15.5025 7.59636 15.5025Z"
                  fill="#1C1C1C"
                />
              </svg>
            </div>
          </div>
          {/* Add more message cards here if it's a list */}
        </div>
        {/* "Ask a question" button - positioned at the bottom of the flex container */}
        <div className="allm-p-4 allm-flex allm-justify-center allm-items-center">
          {/* Added padding and optional border */}
          <div
            className="allm-px-6 allm-py-3 allm-bg-black-text allm-rounded-lg allm-inline-flex allm-justify-center allm-items-center allm-gap-3 allm-cursor-pointer hover:allm-bg-gray-800" // Centered button, adjusted padding, added hover
            onClick={handleAskQuestionClick}
          >
            <div className="allm-justify-start allm-pe-4 allm-text-white-text allm-text-sm allm-font-semibold">{mergedSettings.askQuestionText}</div>
            <div className="allm-relative">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.44476 17.4435L9.43651 17.445L9.38326 17.4713L9.36826 17.4743L9.35776 17.4713L9.30451 17.445C9.29651 17.4425 9.29051 17.4438 9.28651 17.4488L9.28351 17.4563L9.27076 17.7773L9.27451 17.7923L9.28201 17.802L9.36001 17.8575L9.37126 17.8605L9.38026 17.8575L9.45826 17.802L9.46726 17.79L9.47026 17.7773L9.45751 17.457C9.45551 17.449 9.45126 17.4445 9.44476 17.4435ZM9.64351 17.3588L9.63376 17.3603L9.49501 17.43L9.48751 17.4375L9.48526 17.4458L9.49876 17.7683L9.50251 17.7773L9.50851 17.7825L9.65926 17.8523C9.66876 17.8548 9.67601 17.8528 9.68101 17.8463L9.68401 17.8358L9.65851 17.3753C9.65601 17.3663 9.65101 17.3608 9.64351 17.3588ZM9.10726 17.3603C9.10395 17.3583 9.1 17.3576 9.09623 17.3585C9.09246 17.3593 9.08915 17.3616 9.08701 17.3648L9.08251 17.3753L9.05701 17.8358C9.05751 17.8448 9.06176 17.8508 9.06976 17.8538L9.08101 17.8523L9.23176 17.7825L9.23926 17.7765L9.24226 17.7683L9.25501 17.4458L9.25276 17.4368L9.24526 17.4293L9.10726 17.3603Z"
                  fill="#FAFAFA"
                />
                <path
                  d="M9 1.5C13.1423 1.5 16.5 4.85775 16.5 9C16.5 13.1423 13.1423 16.5 9 16.5C4.85775 16.5 1.5 13.1423 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5ZM9 12C8.80109 12 8.61032 12.079 8.46967 12.2197C8.32902 12.3603 8.25 12.5511 8.25 12.75C8.25 12.9489 8.32902 13.1397 8.46967 13.2803C8.61032 13.421 8.80109 13.5 9 13.5C9.19891 13.5 9.38968 13.421 9.53033 13.2803C9.67098 13.1397 9.75 12.9489 9.75 12.75C9.75 12.5511 9.67098 12.3603 9.53033 12.2197C9.38968 12.079 9.19891 12 9 12ZM9 4.875C8.27894 4.875 7.58742 5.16144 7.07755 5.6713C6.56769 6.18117 6.28125 6.87269 6.28125 7.59375C6.28125 7.79266 6.36027 7.98343 6.50092 8.12408C6.64157 8.26473 6.83234 8.34375 7.03125 8.34375C7.23016 8.34375 7.42093 8.26473 7.56158 8.12408C7.70223 7.98343 7.78125 7.79266 7.78125 7.59375C7.7815 7.37253 7.84195 7.15554 7.95614 6.96607C8.07032 6.77659 8.23392 6.62176 8.4294 6.51819C8.62488 6.41462 8.84487 6.3662 9.06577 6.37814C9.28667 6.39008 9.50015 6.46192 9.68333 6.58596C9.86651 6.70999 10.0125 6.88155 10.1056 7.08223C10.1987 7.28291 10.2354 7.50514 10.2118 7.7251C10.1882 7.94506 10.1052 8.15446 9.97164 8.33082C9.8381 8.50719 9.65907 8.64389 9.45375 8.72625C8.94675 8.92875 8.25 9.44775 8.25 10.3125V10.5C8.25 10.6989 8.32902 10.8897 8.46967 11.0303C8.61032 11.171 8.80109 11.25 9 11.25C9.19891 11.25 9.38968 11.171 9.53033 11.0303C9.67098 10.8897 9.75 10.6989 9.75 10.5C9.75 10.317 9.7875 10.2255 9.94575 10.1475L10.011 10.1175C10.5966 9.88192 11.082 9.44997 11.3841 8.89569C11.6861 8.34141 11.7859 7.69934 11.6663 7.07954C11.5468 6.45974 11.2154 5.90082 10.7289 5.4986C10.2425 5.09638 9.63122 4.87592 9 4.875Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation and Footer */}
      <div className="allm-flex allm-flex-col allm-gap-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <NavigationBar activeScreen={activeScreen} onNavigate={onNavigate} />
        <Sponsor />
      </div>
    </div>
  );
};

export default MessagesPage;
