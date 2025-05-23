// implement another hook for active screen in local storage and use it here
// this is the main for this codebase
// implement routing here

import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";
import useSessionId from "@/hooks/useSessionId";
import MessagesPage from "./MessagesPage";

function ChatWindow({ closeChat, settings }) {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState("");

  const handleNavigate = (location) => navigate(`/${location}`);
  const handleNavClick = (screen) => {
    setActiveScreen(screen);
    handleNavigate(screen);
  };

  const handleStartNewChat = (initialQuestion = null) => {
    const newSessionId = useSessionId({ createNewSessionId: true });
    navigate(`/chat/${newSessionId}`);
    // TODO: Handle Recent Messages Here
    // In a real app, you might also store the initial question in state
    // so ChatPage can pick it up. For this example, ChatPage will just log it.
    console.log("New chat started with ID:", newSessionId, "Initial question:", initialQuestion);
  };

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-font-sans allm-text-sm">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onStartNewChat={handleStartNewChat}
              onNavClick={handleNavClick}
              onNavigate={handleNavigate}
              settings={settings}
              activeScreen={activeScreen}
            />
          }
        />
        <Route path="/chat/:sessionId" element={<ChatPage closeChat={closeChat} settings={settings} onNavigate={handleNavigate} />} />
        <Route path="/messages" element={<MessagesPage onStartNewChat={handleStartNewChat} settings={settings} onNavClick={handleNavClick} onNavigate={handleNavigate} activeScreen={activeScreen} />} />
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

  const markdown = target.parentElement?.parentElement?.querySelector("pre:first-of-type")?.innerText;
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
