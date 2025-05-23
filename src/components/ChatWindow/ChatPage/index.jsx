// src/components/ChatWindow/HomePage/index.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Assuming i18next is set up
// import { v4 as uuidv4 } from 'uuid'; // For generating new session IDs

// --- Sub-components for modularity ---

// WelcomeSection.jsx
const WelcomeSection = ({ greeting, helpPrompt }) => {
  return (
    <div className="allm-px-4 allm-pt-8 allm-pb-6 allm-bg-gradient-to-br allm-from-gray-900 allm-to-gray-800 allm-rounded-b-2xl allm-shadow-lg">
      <div className="allm-flex allm-items-center allm-mb-4">
        {/* Placeholder for Bot Icon/Logo from settings.brandImageUrl */}
        <div className="allm-w-10 allm-h-10 allm-bg-gray-700 allm-rounded-full allm-flex allm-items-center allm-justify-center allm-mr-3">
          <svg className="allm-w-6 allm-h-6 allm-text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM7 9a1 1 0 100 2h6a1 1 0 100-2H7zm6 3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
          </svg>
        </div>
        <h1 className="allm-text-white allm-text-2xl allm-font-bold">{greeting}</h1>
        <span className="allm-text-2xl allm-ml-2">👋</span> {/* Hand emoji */}
      </div>
      <p className="allm-text-gray-300 allm-text-xl allm-font-semibold">{helpPrompt}</p>
    </div>
  );
};

// RecentMessageCard.jsx
const RecentMessageCard = ({ message, sender, timeAgo, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-md allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200 allm-min-w-[280px] allm-max-w-xs" // Added min-w for horizontal scroll
      onClick={onClick}
    >
      <div className="allm-flex allm-items-center">
        {/* Placeholder for Sender Avatar */}
        <div className="allm-w-8 allm-h-8 allm-bg-gray-200 allm-rounded-full allm-flex allm-items-center allm-justify-center allm-mr-3">
          <svg className="allm-w-5 allm-h-5 allm-text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM7 9a1 1 0 100 2h6a1 1 0 100-2H7zm6 3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div>
          <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{message}</p>
          <p className="allm-text-gray-500 allm-text-xs">{sender} - {timeAgo}</p>
        </div>
      </div>
      <svg className="allm-w-4 allm-h-4 allm-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

// AskQuestionCard.jsx
const AskQuestionCard = ({ placeholder, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-md allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200"
      onClick={onClick}
    >
      <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{placeholder}</p>
      <svg className="allm-w-5 allm-h-5 allm-text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1zm0 4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
      </svg>
    </div>
  );
};

// QuickQuestionItem.jsx
const QuickQuestionItem = ({ question, subtitle, onClick }) => {
  return (
    <div
      className="allm-bg-white allm-rounded-xl allm-shadow-sm allm-p-4 allm-flex allm-items-center allm-justify-between allm-cursor-pointer hover:allm-bg-gray-50 active:allm-bg-gray-100 allm-transition-colors allm-duration-200"
      onClick={onClick}
    >
      <div>
        <p className="allm-text-gray-800 allm-font-semibold allm-text-sm">{question}</p>
        {subtitle && <p className="allm-text-gray-500 allm-text-xs mt-1">{subtitle}</p>}
      </div>
      <svg className="allm-w-4 allm-h-4 allm-text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  );
};

// QuickQuestionsSection.jsx
const QuickQuestionsSection = ({ title, questions, onQuestionClick }) => {
  return (
    <div className="allm-space-y-4">
      <h2 className="allm-text-gray-800 allm-font-semibold allm-text-lg">{title}</h2>
      <div className="allm-space-y-3">
        {questions.map((q, index) => (
          <QuickQuestionItem
            key={index}
            question={q.question}
            subtitle={q.subtitle}
            onClick={() => onQuestionClick(q.question)}
          />
        ))}
      </div>
    </div>
  );
};

// NavigationBar.jsx (Simplified for Home/Messages only)
const NavigationBar = ({ activeScreen, onNavClick }) => {
  const { t } = useTranslation(); // Assuming i18n is set up

  return (
    <nav className="allm-flex allm-justify-around allm-items-center allm-bg-white allm-rounded-t-2xl allm-shadow-lg allm-py-3 allm-px-4 allm-border-t allm-border-gray-200">
      <button
        onClick={() => onNavClick('home')}
        className={`allm-flex allm-flex-col allm-items-center allm-text-sm allm-font-medium ${activeScreen === 'home' ? 'allm-text-blue-600' : 'allm-text-gray-500'}`}
        aria-label={t('nav.home_aria_label', { defaultValue: 'Go to Home page' })}
      >
        <svg className="allm-w-6 allm-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
        <span>{t('nav.home', { defaultValue: 'Home' })}</span>
      </button>
      <button
        onClick={() => onNavClick('messages')}
        className={`allm-flex allm-flex-col allm-items-center allm-text-sm allm-font-medium ${activeScreen === 'messages' ? 'allm-text-blue-600' : 'allm-text-gray-500'}`}
        aria-label={t('nav.messages_aria_label', { defaultValue: 'Go to Messages' })}
      >
        <svg className="allm-w-6 allm-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
        </svg>
        <span>{t('nav.messages', { defaultValue: 'Messages' })}</span>
      </button>
    </nav>
  );
};


// SponsorFooter.jsx
const SponsorFooter = ({ brandName }) => {
  return (
    <div className="allm-text-center allm-text-gray-400 allm-text-xs allm-mt-4 allm-pb-2">
      <span className="allm-inline-flex allm-items-center">
        <svg className="allm-w-3 allm-h-3 allm-mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 7a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
        </svg>
        Powered by {brandName}
      </span>
    </div>
  );
};


// --- Main HomePage Component ---

const HomePage = ({ onNavClick, activeScreen, settings, onStartNewChat }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation

  // Default data if not provided by settings
  const defaultSettings = {
    welcomeGreeting: t('home.greeting', { defaultValue: 'Hi there' }),
    welcomeHelpPrompt: t('home.help_prompt', { defaultValue: 'We are here to help?' }),
    askQuestionPlaceholder: t('home.ask_question.placeholder', { defaultValue: 'AlphaBot is here to help' }),
    quickQuestionsTitle: t('home.quick_questions.title', { defaultValue: 'Quick Questions' }),
    quickQuestionsData: [
      { question: t('home.quick_questions.alphabase', { defaultValue: 'What is Alphabase?' }), subtitle: t('home.quick_questions.alphabase_subtitle', { defaultValue: 'Learn about our mission and vision.' }) },
      { question: t('home.quick_questions.features', { defaultValue: 'What features do you offer?' }), subtitle: t('home.quick_questions.features_subtitle', { defaultValue: 'Unlock the full potential of Alphabase.' }) },
      { question: t('home.quick_questions.whats_new', { defaultValue: "What's new?" }) },
    ],
    recentMessageData: {
      message: t('home.recent_message.default_message', { defaultValue: 'Hello !' }),
      sender: t('home.recent_message.default_sender', { defaultValue: 'Fin' }),
      timeAgo: t('home.recent_message.default_time_ago', { defaultValue: '1h ago' }),
      sessionId: 'default-recent-chat-id', // Placeholder session ID for the recent message
    },
    brandName: 'Alphabase', // Default brand name
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
    navigate(`/chat/${sessionId}`);
  };

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-bg-gray-100">
      {/* Welcome Section (Header-like part) */}
      <WelcomeSection
        greeting={mergedSettings.welcomeGreeting}
        helpPrompt={mergedSettings.welcomeHelpPrompt}
      />

      {/* Main content area */}
      <div className="allm-flex-grow allm-overflow-y-auto allm-p-4 allm-space-y-4">
        {/* Recent Message Section (Horizontal Scroll Container) */}
        <div className="allm-space-y-2">
          <h2 className="allm-text-gray-800 allm-font-semibold allm-text-lg allm-px-1">
            {t('home.recent_messages_title', { defaultValue: 'Recent Message' })}
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
              message={t('home.recent_message.example_message', { defaultValue: 'How can I help?' })}
              sender={t('home.recent_message.example_sender', { defaultValue: 'Bot' })}
              timeAgo={t('home.recent_message.example_time_ago', { defaultValue: '2h ago' })}
              onClick={() => handleRecentMessageClick('example-chat-id-2')}
            />
             <RecentMessageCard
              message={t('home.recent_message.another_message', { defaultValue: 'Tell me about features.' })}
              sender={t('home.recent_message.another_sender', { defaultValue: 'User' })}
              timeAgo={t('home.recent_message.another_time_ago', { defaultValue: '3h ago' })}
              onClick={() => handleRecentMessageClick('example-chat-id-3')}
            />
          </div>
        </div>

        {/* Ask a question card */}
        <AskQuestionCard
          placeholder={mergedSettings.askQuestionPlaceholder}
          onClick={handleAskQuestionClick}
        />

        {/* Quick Questions Section */}
        <QuickQuestionsSection
          title={mergedSettings.quickQuestionsTitle}
          questions={mergedSettings.quickQuestionsData}
          onQuestionClick={handleQuickQuestionClick}
        />
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeScreen={activeScreen} onNavClick={onNavClick} />

      {/* Powered by section */}
      <SponsorFooter brandName={mergedSettings.brandName} />
    </div>
  );
};

// export default HomePage;