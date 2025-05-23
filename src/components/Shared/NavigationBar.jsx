import { House, Chats } from "@phosphor-icons/react";
import React from "react";

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
        onClick={() => onNavClick("")}
        className={`
          allm-flex allm-flex-col allm-items-center allm-gap-[5px]
          allm-text-sm allm-font-medium
          ${activeScreen === "" ? "allm-text-black allm-text-extrabold" : "allm-text-gray-500"}
          allm-duration-200 allm-border-0 allm-bg-transparent
        `}
        aria-label="Go to Home page"
      >
        {activeScreen === "" ? <House size={30} weight="fill" /> : <House size={30} />}
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
        {activeScreen === "messages" ? <Chats size={30} weight="fill" /> : <Chats size={30} />}
        <span>Messages</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
