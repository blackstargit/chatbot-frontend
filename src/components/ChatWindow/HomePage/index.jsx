import React from "react";
import { useTranslation } from "react-i18next";

import Sponsor from "@/components/Shared/Sponsor";
import NavigationBar from "@/components/Shared/NavigationBar";

import WelcomeSection from "@/components/ChatWindow/HomePage/WelcomeSection";
import AskQuestionCard from "@/components/ChatWindow/HomePage/AskQuestionCard";
import QuickQuestionsSection from "@/components/ChatWindow/HomePage/QuickQuestionSection";
import RecentMessageCard from "@/components/Shared/RecentMessageCard";

const HomePage = ({ onNavClick, onNavigate, activeScreen, settings, onStartNewChat }) => {
  const { t } = useTranslation();
  console.log("IN HOME PAGE");

  // Default data if not provided by settings
  const defaultSettings = {
    welcomeGreeting: t("home.greeting", { defaultValue: "Hi there" }),
    welcomeHelpPrompt: t("home.help_prompt", { defaultValue: "We are here to help?" }),
    askQuestionPlaceholder: t("home.ask_question.placeholder", { defaultValue: "AlphaBot is here to help" }),
    quickQuestionsTitle: t("home.quick_questions.title", { defaultValue: "Quick Questions" }),
    quickQuestionsData: [
      {
        question: t("home.quick_questions.alphabase", { defaultValue: "What is Alphabase?" }),
        subtitle: t("home.quick_questions.alphabase_subtitle", { defaultValue: "Learn about our mission and vision." }),
      },
      {
        question: t("home.quick_questions.features", { defaultValue: "What features do you offer?" }),
        subtitle: t("home.quick_questions.features_subtitle", { defaultValue: "Unlock the full potential of Alphabase." }),
      },
      { question: t("home.quick_questions.whats_new", { defaultValue: "What's new?" }) },
    ],
    recentMessageData: {
      message: t("home.recent_message.default_message", { defaultValue: "Hello !" }),
      sender: t("home.recent_message.default_sender", { defaultValue: "Fin" }),
      timeAgo: t("home.recent_message.default_time_ago", { defaultValue: "1h ago" }),
      sessionId: "default-recent-chat-id", // Placeholder session ID for the recent message
    },
    brandName: "Alphabase", // Default brand name
  };

  // Merge default settings with provided settings
  const mergedSettings = { ...defaultSettings, ...settings };

  const handleAskQuestionClick = () => {
    // This will generate a new session and navigate to the chat page
    onStartNewChat();
  };

  const handleQuickQuestionClick = (questionText) => {
    // This will generate a new session and navigate to the chat page, then send the question
    onStartNewChat(questionText);
  };

  const handleRecentMessageClick = (sessionId) => {
    // Navigate to the specific chat session
    onNavigate(`chat/${sessionId}`);
  };

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-bg-gray-100">
      {/* Welcome Section (Header-like part) */}
      <WelcomeSection greeting={mergedSettings.welcomeGreeting} helpPrompt={mergedSettings.welcomeHelpPrompt} />

      {/* Main content area */}
      <div className="allm-flex-grow allm-overflow-y-auto allm-p-4 allm-space-y-4">
        {/* Recent Message Section (Horizontal Scroll Container) */}
        <div className="allm-space-y-2">
          <h2 className="allm-text-gray-800 allm-font-semibold allm-text-lg allm-px-1">
            {t("home.recent_messages_title", { defaultValue: "Recent Message" })}
          </h2>

          <div className="allm-flex allm-overflow-x-auto allm-space-x-3 allm-pb-2 allm-px-1 allm-no-scrollbar">
            {/* You can map multiple RecentMessageCard components here if you have more recent chats */}
            <RecentMessageCard
              message={mergedSettings.recentMessageData.message}
              sender={mergedSettings.recentMessageData.sender}
              timeAgo={mergedSettings.recentMessageData.timeAgo}
              onClick={() => handleRecentMessageClick(mergedSettings.recentMessageData.sessionId)}
            />
            {/* Add more RecentMessageCard instances for horizontal scroll effect */}
            <RecentMessageCard
              message={t("home.recent_message.example_message", { defaultValue: "How can I help?" })}
              sender={t("home.recent_message.example_sender", { defaultValue: "Bot" })}
              timeAgo={t("home.recent_message.example_time_ago", { defaultValue: "2h ago" })}
              onClick={() => handleRecentMessageClick("example-chat-id-2")}
            />
            <RecentMessageCard
              message={t("home.recent_message.another_message", { defaultValue: "Tell me about features." })}
              sender={t("home.recent_message.another_sender", { defaultValue: "User" })}
              timeAgo={t("home.recent_message.another_time_ago", { defaultValue: "3h ago" })}
              onClick={() => handleRecentMessageClick("example-chat-id-3")}
            />
          </div>
        </div>

        {/* Ask a question card */}
        <AskQuestionCard placeholder={mergedSettings.askQuestionPlaceholder} onClick={handleAskQuestionClick} />

        {/* Quick Questions Section */}
        <QuickQuestionsSection
          title={mergedSettings.quickQuestionsTitle}
          questions={mergedSettings.quickQuestionsData}
          onQuestionClick={handleQuickQuestionClick}
        />
      </div>

      <div className="allm-flex allm-flex-col allm-gap-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <NavigationBar activeScreen={activeScreen} onNavClick={onNavClick} />
        <Sponsor settings={settings} />
      </div>
    </div>
  );
};

export default HomePage;
