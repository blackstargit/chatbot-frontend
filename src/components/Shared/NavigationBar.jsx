import { House, Chats } from "@phosphor-icons/react";
import React from "react";

import HomeIcon from "@/assets/home-1.svg";
import MessagesIcon from "@/assets/messages-3.svg";
import HomeIconOutline from "@/assets/home-1 (1).svg";
import MessagesIconOutline from "@/assets/messages-3 (1).svg";

const NavigationBar = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="allm-flex allm-justify-around allm-items-center allm-w-full allm-h-13">
      {/* Home Button */}
      <button
        onClick={() => onNavigate("")}
        className={`
          allm-flex allm-flex-col allm-items-center allm-gap-[5px]
          allm-text-sm allm-font-medium
          ${activeScreen === "" ? "allm-text-black allm-text-extrabold" : "allm-text-gray-500"}
          allm-duration-200 allm-border-0 allm-bg-transparent
        `}
        aria-label="Go to Home page"
      >
        {activeScreen === "" ? <img src={HomeIcon} alt="Home" /> : <img src={HomeIconOutline} alt="Home" />}
        <span>Home</span>
      </button>

      {/* Messages Button */}
      <button
        onClick={() => onNavigate("messages")}
        className={`
          allm-flex allm-flex-col allm-items-center allm-gap-[5px]
          allm-text-sm allm-font-medium
          ${activeScreen === "messages" ? "allm-text-black allm-text-extrabold" : "allm-text-gray-500"}
          allm-duration-200 allm-border-0 allm-bg-transparent
        `}
        aria-label="Go to Messages"
      >
        {activeScreen === "messages" ? <img src={MessagesIcon} alt="Messages" /> : <img src={MessagesIconOutline} alt="Messages" />}
        <span>Messages</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
