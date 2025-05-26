import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import useSessionId from "@/hooks/useSessionId";
import { ACTIVE_SCREEN } from "@/utils/constants";

import HomePage from "@/components/ChatWindow/HomePage";
import ChatPage from "@/components/ChatWindow/ChatPage";
import MessagesPage from "@/components/ChatWindow/MessagesPage";
import { v4 as uuidv4 } from "uuid";
import useClientUserId from "@/hooks/useClientUserId";

// implement another hook for active screen in local storage and use it here
// this is the main for this codebase
// implement routing here
function ChatWindow({ closeChat, settings }) {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState(
    window?.localStorage?.getItem(ACTIVE_SCREEN) || ""
  );
  const sessionId = useSessionId();
  const clientUserId = useClientUserId();

  const handleNavigate = (location) => {
    setActiveScreen(location);
    window.localStorage.setItem(ACTIVE_SCREEN, location);

    console.log("Location: ", location);
    navigate(`/${location}`);
  };

const handleStartNewChat = (initialQuestion = null) => {
  const newSessionId = uuidv4();

  const encoded = initialQuestion ? encodeURIComponent(initialQuestion) : "";
  const chatUri = `chat/${newSessionId}${encoded ? `?q=${encoded}` : ""}`;

  const screen = chatUri.split("?")[0];
  setActiveScreen(screen);
  window.localStorage.setItem(ACTIVE_SCREEN, screen);

  navigate(`/${chatUri}`);
};


  const handleRecentMessageClick = () => {
    handleNavigate(`chat/${sessionId}`);
  };

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-font-['Roboto'] allm-text-sm allm-rounded-2xl">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              settings={settings}
              activeScreen={activeScreen}
              clientUserId={clientUserId}
              onRecentMessageClick={handleRecentMessageClick}
              onStartNewChat={handleStartNewChat}
              onNavigate={handleNavigate}
            />
          }
        />
        <Route
          path="/chat/:sessionId"
          element={
            <ChatPage
              closeChat={closeChat}
              settings={settings}
              clientUserId={clientUserId}
              onStartNewChat={handleStartNewChat}
              onNavigate={handleNavigate}
            />
          }
        />
        <Route
          path="/messages"
          element={
            <MessagesPage
              settings={settings}
              activeScreen={activeScreen}
              clientUserId={clientUserId}
              onNavigate={handleNavigate}
              onStartNewChat={handleStartNewChat}
              onRecentMessageClick={handleRecentMessageClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default ChatWindow;

// Enables us to safely markdown and sanitize all responses without risk of injection
// but still be able to attach a handler to copy code snippets on all elements
// that are code snippets.
function copyCodeSnippet(uuid) {
  const target = document.querySelector(`[data-code="${uuid}"]`);
  if (!target) return false;

  const markdown =
    target.parentElement?.parentElement?.querySelector("pre:first-of-type")?.innerText;
  if (!markdown) return false;

  window.navigator.clipboard.writeText(markdown);

  target.classList.add("allm-text-green-500");
  const originalText = target.innerHTML;
  target.innerText = "Copied!";
  target.setAttribute("disabled", true);

  setTimeout(() => {
    target.classList.remove("allm-text-green-500");
    target.innerHTML = originalText;
    target.removeAttribute("disabled");
  }, 2500);
}

// Listens and hunts for all data-code-snippet clicks.
function setEventDelegatorForCodeSnippets() {
  document?.addEventListener("click", function (e) {
    const target = e.target.closest("[data-code-snippet]");
    const uuidCode = target?.dataset?.code;
    if (!uuidCode) return false;
    copyCodeSnippet(uuidCode);
  });
}
