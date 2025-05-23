// src/components/ChatWindow/Shared/Footer/index.jsx
import { MessengerLogo, House, Chats } from "@phosphor-icons/react";
import { HouseSimple } from "@phosphor-icons/react/dist/ssr";
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
        {activeScreen === "home" ? <House size={30} weight="fill" /> : <House size={30} />}
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
        {activeScreen === "home" ? <Chats size={30} /> : <Chats size={30} weight="fill" />}
        <span>Messages</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
