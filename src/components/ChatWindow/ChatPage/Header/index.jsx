// src/components/ChatWindow/ChatPage/ChatPageHeader.jsx

import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CaretLeft, DotsThreeOutline, DotsThreeOutlineVertical, X } from "@phosphor-icons/react";
import OptionsMenu from "./OptionsMenu";
import AnythingLLMIcon from "@/assets/anything-llm-icon.svg";

export default function ChatPageHeader({
  sessionId,
  settings = {},
  iconUrl = null,
  closeChat, // This prop is for closing the entire chatbot window
  onStartNewChat, // New prop: function to start a new chat session
}) {
  const [showingOptions, setShowOptions] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();
  // const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle starting a new chat
  const handleNewChat = () => {
    onStartNewChat(); // Call the prop function to generate new session and navigate
    setShowOptions(false); // Close options menu after action
  };

  // Effect to handle clicks outside the options menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]); // Added buttonRef to dependencies

  const handleBackToHome = () => {
    // navigate("/"); // Navigate back to the Home page route
    console.log("Navigate to home");
  };

  return (
    <div
      style={{ borderBottom: "1px solid #E9E9E9" }}
      className="allm-flex allm-items-center allm-justify-between allm-flex-row allm-w-full allm-h-15 allm-gap-2.5"
      id="chat-page-header"
    >
      <div className="allm-flex allm-items-center allm-justify-between allm-flex-row allm-w-full allm-px-6 allm-py-[10px] allm-mt-[1px]">
        {/* height must be 42px */}
        {/* Left Section: Back button, Icon, Title & Subtitle */}
        <div className="allm-flex allm-items-center allm-justify-start allm-flex-row allm-gap-1.5">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBackToHome}
            className="allm-flex allm-items-center allm-justify-center allm-bg-transparent hover:allm-cursor-pointer allm-border-none hover:allm-bg-gray-100/50 allm-text-slate-600 focus:allm-outline-none focus:allm-ring-1 focus:allm-ring-inset focus:allm-ring-gray-300"
            aria-label="Back to Home"
          >
            <CaretLeft size={24} />
          </button>

          <div className="allm-flex allm-items-center allm-justify-start allm-gap-4">
            {/* Icon */}
            <img
              style={{ width: 32, height: 32 }} // Consistent with image
              src={iconUrl ?? AnythingLLMIcon}
              alt={iconUrl ? "Brand" : "Answer Hub Logo"} // More specific alt text
              className="" // Or allm-rounded-full if the icon in image is circular
            />

            {/* Title and Subtitle */}
            <div className="allm-flex allm-flex-col allm-align-center allm-justify-start">
              <h1 className="allm-text-md allm-p-0 allm-m-0">Answer Hub</h1>
              <p className="allm-text-xs allm-p-0 allm-m-0">Your AI-powered assistant.</p>
            </div>
          </div>
        </div>

        {/* Right Section: Options Button */}
        <div className="allm-flex allm-items-center allm-justify-center allm-gap-[5px]">
          {settings.loaded && (
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setShowOptions(!showingOptions)}
              className="allm-px-2.5 allm-bg-transparent hover:allm-cursor-pointer allm-border-none hover:allm-bg-gray-100/50 allm-rounded-full allm-text-slate-600 focus:allm-outline-none focus:allm-ring-1 focus:allm-ring-inset focus:allm-ring-gray-300"
              aria-label="Options menu"
            >
              <DotsThreeOutline size={24} />
            </button>
          )}
        </div>
        {/* Options Menu (positioned based on its own logic, usually absolutely or fixed) */}
        <OptionsMenu settings={settings} showing={showingOptions} startNewChat={handleNewChat} sessionId={sessionId} menuRef={menuRef} />
      </div>
    </div>
  );
}
