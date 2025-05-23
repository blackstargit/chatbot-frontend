// src/components/ChatWindow/Shared/Footer/index.jsx
import React from "react";

/**
 * @typedef {Object} NavigationBarProps
 * @property {'home' | 'messages'} activeScreen - The currently active screen, used for styling the active button.
 * @property {(screen: 'home' | 'messages') => void} onNavClick - Callback function when a navigation button is clicked.
 */

/**
 * NavigationBar Component
 * Renders the bottom navigation bar with Home and Messages buttons.
 *
 * @param {NavigationBarProps} props
 */
const NavigationBar = ({ activeScreen, onNavClick }) => {
  return (
    <nav
      className="
      allm-flex allm-justify-around allm-items-center
      allm-w-full allm-h-13
    "
    >
      {/* Home Button */}
      <button
        onClick={() => onNavClick("home")}
        className={`
          allm-flex allm-flex-col allm-items-center allm-gap-[5px]
          allm-text-sm allm-font-medium
          ${activeScreen === "home" ? "allm-text-black allm-text-extrabold" : "allm-text-gray-500"}
          allm-duration-200 allm-border-0 allm-bg-transparent
        `}
        aria-label="Go to Home page"
      >
        {/* Home Icon (SVG) */}
        <svg className="allm-w-[30px] allm-h-[30px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
        <span>Home</span>
      </button>

      {/* Messages Button */}
      <button
        onClick={() => onNavClick("messages")}
        className={`
          allm-flex allm-flex-col allm-items-center allm-gap-[5px]
          allm-text-sm allm-font-medium
          ${activeScreen === "messages" ? "allm-text-black allm-text-extrabold" : "allm-text-gray-500"}
          allm-duration-200 allm-border-0 allm-bg-transparent
        `}
        aria-label="Go to Messages"
      >
        {/* Messages Icon (SVG) */}
        <svg className="allm-w-[30px] allm-h-[30px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Messages</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
