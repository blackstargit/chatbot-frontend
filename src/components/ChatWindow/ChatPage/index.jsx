import React from "react";
import SessionId from "../../SessionId";
import useChatHistory from "@/hooks/chat/useChatHistory";
import ChatContainer from "./ChatContainer";
import Sponsor from "../../Sponsor";
import { ChatHistoryLoading } from "./ChatContainer/ChatHistory";
import NavigationBar from "../Shared/Footer";
import ChatPageHeader from "./Header";
import { useParams } from "react-router-dom";
// import ResetChat from "../ResetChat";

// implement another hook for active screen in local storage and use it here
// this is the main for this codebase
// implement routing here

export default function ChatWindow({ closeChat, settings }) {
  // fetch all chats history if last active page is messages
  // fetch recent chat name if last active page is home
  // fetch recent chats history if last active page is chat
  const { sessionId } = useParams();
  const { chatHistory, setChatHistory, loading } = useChatHistory(settings, sessionId);

  const handleNewChat = () => {
    console.log("New chat");
  };

  // see if loading is needed for home page since only recent messages needs to be fetched.
  if (loading) {
    return (
      <div className="allm-flex allm-flex-col allm-h-full">
        {/* Header component place*/}
        <ChatPageHeader sessionId={sessionId} settings={settings} iconUrl={settings.brandImageUrl} closeChat={closeChat} onStartNewChat={handleNewChat} />
        <ChatHistoryLoading />
        <div className="allm-pt-4 allm-pb-2 allm-h-fit allm-gap-y-1">
          <SessionId />
          <Sponsor settings={settings} />
        </div>
      </div>
    );
  }

  // no code snippets so this is unnecessary.
  // setEventDelegatorForCodeSnippets();

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-font-sans allm-text-sm">
      {/* Header component place*/}
      {!settings.noHeader && (
        <ChatPageHeader sessionId={sessionId} settings={settings} iconUrl={settings.brandImageUrl} closeChat={closeChat} onStartNewChat={handleNewChat} />
      )}
      <div className="allm-flex-grow allm-overflow-y-auto">
        <ChatContainer sessionId={sessionId} settings={settings} knownHistory={chatHistory} />
      </div>
      <div className="allm-flex allm-flex-col allm-gap-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <NavigationBar
          activeScreen="messages"
          onNavClick={(screen) => {
            if (screen === "home") {
              closeChat();
            }
          }}
        />
        <div className="allm-py-2.5">
          <Sponsor settings={settings} />
        </div>
      </div>
    </div>
  );
}
