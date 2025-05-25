import React from "react";
import { useTranslation } from "react-i18next";

import ArrowRightIcon from "@/assets/ArrowRightIcon.svg"; // Placeholder import, adjust if it's a component
import PlusCircleIcon from "@/assets/PlusCircleIcon.svg"; // Placeholder import, adjust if it's a component

import Sponsor from "@/components/Shared/Sponsor";
import NavigationBar from "@/components/Shared/NavigationBar";

const HomePage = ({ onNavigate, activeScreen, settings, onStartNewChat }) => {
  const { t } = useTranslation();

  const defaultSettings = {
    brandImageUrl: "",
    welcomeGreeting: t("home.greeting", { defaultValue: "Hi there" }),
    welcomeHelpPrompt: t("home.help_prompt", { defaultValue: "We are here to help?" }),
    askQuestionTitle: t("home.ask_question.title", { defaultValue: "Ask a question" }),
    askQuestionPlaceholder: t("home.ask_question.placeholder", { defaultValue: "AlphaBot is here to help" }),
    quickQuestionsTitle: t("home.quick_questions.title", { defaultValue: "Quick Questions" }),
    quickQuestionsData: [
      {
        id: "q1",
        question: t("home.quick_questions.alphabase", { defaultValue: "What is Alphabase?" }),
        subtitle: t("home.quick_questions.alphabase_subtitle", { defaultValue: "Learn about our mission and vision." }),
      },
      {
        id: "q2",
        question: t("home.quick_questions.features", { defaultValue: "What features do you offer?" }),
        subtitle: t("home.quick_questions.features_subtitle", { defaultValue: "Unlock the full potential of Alphabase." }),
      },
      {
        id: "q3",
        question: t("home.quick_questions.whats_new", { defaultValue: "What's new?" }),
        subtitle: t("home.quick_questions.whats_new_subtitle", { defaultValue: "Discover our newest features and updates." }),
      },
    ],
    recentMessageTitle: t("home.recent_messages_title", { defaultValue: "Recent Message" }),
    recentMessageData: {
      message: t("home.recent_message.default_message", { defaultValue: "Hello!" }),
      sender: t("home.recent_message.default_sender", { defaultValue: "Fin" }),
      timeAgo: t("home.recent_message.default_time_ago", { defaultValue: "1h ago" }),
      sessionId: "default-recent-chat-id",
    },
    brandName: "Alphabase",
  };

  const mergedSettings = {
    ...defaultSettings,
    ...(settings || {}),
    brandName: settings?.brandName || defaultSettings.brandName,
    brandImageUrl: settings?.brandImageUrl || defaultSettings.brandImageUrl,
  };
  mergedSettings.quickQuestionsData = settings?.quickQuestionsData || defaultSettings.quickQuestionsData;
  mergedSettings.recentMessageData = settings?.recentMessageData || defaultSettings.recentMessageData;

  const handleAskQuestionClick = () => {
    onStartNewChat();
  };

  const handleQuickQuestionClick = (questionText) => {
    onStartNewChat(questionText);
  };

  const handleRecentMessageClick = (sessionId) => {
    onNavigate(`chat/${sessionId}`);
  };

  return (
    <div className="allm-h-full allm-bg-gradient-to-b allm-from-gradient-start allm-from-[0%] allm-via-gradient-middle allm-via-[32%] allm-to-gradient-end allm-to-[48%] allm-rounded-2xl allm-flex allm-flex-col">
      <div className="allm-h-full allm-px-4 allm-flex allm-flex-1 allm-flex-col allm-gap-3 allm-overflow-y-auto">
        <div className="allm-px-6 allm-pt-9 allm-w-96 allm-justify-center allm-items-start allm-self-center allm-flex allm-flex-col">
          <img src={mergedSettings.brandImageUrl || ""} alt={mergedSettings.brandName || "Brand Logo"} className="allm-w-8 allm-h-8" />
        </div>

        <div className="allm-w-96 allm-h-16 allm-bg-transparent allm-relative allm-self-center" />

        <div className="allm-w-96 allm-px-6 allm-flex allm-flex-col allm-justify-start allm-items-center allm-self-center">
          <div className="allm-self-stretch allm-justify-start allm-text-greeting allm-text-3xl allm-font-bold">{mergedSettings.welcomeGreeting}</div>
          <div className="allm-self-stretch allm-justify-start allm-text-white-text allm-text-3xl allm-font-bold">{mergedSettings.welcomeHelpPrompt}</div>
        </div>

        <div className="allm-w-96 allm-h-6 allm-relative allm-self-center" />

        <div
          className="allm-w-96 allm-px-6 allm-py-5 allm-bg-white allm-rounded-2xl allm-shadow-[0px_7px_4px_0px_rgba(0,0,0,0.25)] allm-flex allm-flex-col allm-justify-start allm-items-start allm-gap-3 allm-self-center allm-cursor-pointer"
          onClick={() => handleRecentMessageClick(mergedSettings.recentMessageData.sessionId)}
        >
          <div className="allm-self-stretch allm-relative">
            <div className="allm-text-left allm-justify-start allm-text-black-text allm-text-base allm-font-bold allm-leading-snug allm-mb-2">
              {mergedSettings.recentMessageTitle}
            </div>
            <div className="allm-w-full allm-py-1 allm-inline-flex allm-justify-start allm-items-center allm-gap-2">
              <div className="allm-w-11 allm-h-11 allm-relative allm-rounded-[80px] allm-flex-shrink-0">
                <img
                  src={mergedSettings.brandImageUrl || ""}
                  alt={mergedSettings.brandName || "Recent Message"}
                  className="allm-w-10 allm-h-10 allm-left-0 allm-top-0 allm-absolute"
                />
              </div>
              <div className="allm-flex allm-flex-col allm-flex-grow allm-min-w-0">
                <div className="allm-justify-start allm-text-black-text allm-text-base allm-font-normal allm-leading-snug allm-truncate">
                  {mergedSettings.recentMessageData.message}
                </div>
                <div className="allm-justify-start allm-text-subtitle allm-text-base allm-font-normal allm-leading-snug allm-truncate">
                  {mergedSettings.recentMessageData.sender} - {mergedSettings.recentMessageData.timeAgo}
                </div>
              </div>
              <img src={ArrowRightIcon} alt="Arrow Right" className="allm-w-5 allm-h-5 allm-text-black-text allm-flex-shrink-0 allm-ml-auto" />
            </div>
          </div>
        </div>

        <div
          className="allm-w-96 allm-px-6 allm-py-5 allm-bg-white allm-rounded-2xl allm-shadow-[0px_7px_4px_0px_rgba(0,0,0,0.25)] allm-flex allm-flex-col allm-justify-start allm-items-start allm-gap-3 allm-self-center allm-cursor-pointer"
          onClick={handleAskQuestionClick}
        >
          <div className="allm-self-stretch allm-h-10 allm-relative allm-flex allm-justify-between allm-items-center">
            <div>
              <div className="allm-justify-start allm-text-black-text allm-text-base allm-font-bold allm-leading-snug">{mergedSettings.askQuestionTitle}</div>
              <div className="allm-justify-start allm-text-black-text allm-text-base allm-font-normal allm-leading-snug">
                {mergedSettings.askQuestionPlaceholder}
              </div>
            </div>
            <img src={PlusCircleIcon} alt="Plus Circle" className="allm-w-5 allm-h-5 allm-text-black-text" />
          </div>
        </div>

        <div className="allm-w-96 allm-px-6 allm-py-5 allm-bg-white allm-rounded-2xl allm-shadow-[0px_7px_4px_0px_rgba(0,0,0,0.25)] allm-flex allm-flex-col allm-justify-start allm-items-start allm-gap-3 allm-self-center">
          <div className="allm-self-stretch allm-flex-1 allm-relative">
            <div className="allm-text-left allm-justify-start allm-text-black-text allm-text-base allm-font-bold allm-leading-snug">
              {mergedSettings.quickQuestionsTitle}
            </div>
            <div className="allm-mt-2">
              {mergedSettings.quickQuestionsData.map((item, index) => (
                <div
                  key={item.id || index}
                  className="allm-w-full allm-py-3 allm-relative allm-flex allm-justify-between allm-items-center allm-gap-2 allm-cursor-pointer group"
                  onClick={() => handleQuickQuestionClick(item.question)}
                >
                  <div className="allm-flex allm-flex-col allm-flex-grow allm-min-w-0">
                    <div className="allm-justify-start allm-text-black-text allm-text-base allm-group-hover:allm-font-bold allm-leading-snug allm-truncate">
                      {item.question}
                    </div>
                    {item.subtitle && (
                      <div className="allm-justify-start allm-text-subtitle allm-text-sm allm-font-normal allm-leading-snug allm-truncate">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <img src={ArrowRightIcon} alt="Arrow Right" className="allm-w-5 allm-h-5 allm-text-black-text allm-flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="allm-w-96 allm-h-20 allm-relative allm-self-center" />
      </div>

      <div className="allm-flex allm-flex-col allm-gap-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <NavigationBar activeScreen={activeScreen} onNavigate={onNavigate} />
        <Sponsor />
      </div>
    </div>
  );
};

export default HomePage;
