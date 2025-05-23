import React from "react";

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

export default AskQuestionButton;