import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import useChatHistory from "@/hooks/chat/useChatHistory";

import Sponsor from "@/components/Shared/Sponsor";
import ChatContainer from "@/components/ChatWindow/ChatPage/ChatContainer";
import ChatHistoryLoading from "@/components/ChatWindow/ChatPage/ChatContainer/ChatHistory/Loading";
import ChatPageHeader from "@/components/ChatWindow/ChatPage/Header";
import PromptInput from "@/components/ChatWindow/ChatPage/ChatContainer/PromptInput";
import { SEND_TEXT_EVENT } from "@/components/ChatWindow/ChatPage/ChatContainer";

export default function ChatPage({
  closeChat,
  settings,
  clientUserId,
  onStartNewChat,
  onNavigate,
}) {
  const { sessionId } = useParams();
  const location = useLocation();
  const { chatHistory, setChatHistory, loading } = useChatHistory(settings, sessionId);

  const [message, setMessage] = useState("");
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  let isListenerAttached = false;

  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Inside handleSubmit");
    if (!message) return;
    if (!window) return;
    if (!settings?.embedId) return;

    if (!isRegistered) {
      const STORAGE_IDENTIFIER = `allm_${settings.embedId}_session_id`;
      window.localStorage.setItem(STORAGE_IDENTIFIER, sessionId);
      setIsRegistered(true);
    }

    const newUserMessage = {
      content: message,
      role: "user",
      sentAt: Math.floor(Date.now() / 1000),
    };

    const assistantPlaceholder = {
      content: "",
      role: "assistant",
      pending: true,
      userMessage: message,
      animate: true,
      sentAt: Math.floor(Date.now() / 1000),
    };

    console.log("Finished assistantPlaceholder");
    setChatHistory((prev) => [...prev, newUserMessage, assistantPlaceholder]);
    setMessage("");
    setLoadingResponse(true);
    console.log("Finished setChatHistory");
  };

  const sendCommand = (command, history = [], attachments = []) => {
    if (!command) return;

    let updatedHistory;
    if (history.length > 0) {
      updatedHistory = [
        ...history,
        {
          content: "",
          role: "assistant",
          pending: true,
          userMessage: command,
          attachments,
          animate: true,
        },
      ];
    } else {
      updatedHistory = [
        ...chatHistory,
        {
          content: command,
          role: "user",
          attachments,
        },
        {
          content: "",
          role: "assistant",
          pending: true,
          userMessage: command,
          animate: true,
        },
      ];
    }
    console.log("Updated history: ", updatedHistory);
    setChatHistory(updatedHistory);
    setLoadingResponse(true);
  };

  const handleAutofillEvent = (event) => {
    if (!event.detail.command) return;
    sendCommand(event.detail.command, [], []);
  };

  useEffect(() => {
    if (!isListenerAttached) {
      window.addEventListener(SEND_TEXT_EVENT, handleAutofillEvent);
      isListenerAttached = true;
      console.log("Listener manually flagged as attached");
    }

    return () => {
      window.removeEventListener(SEND_TEXT_EVENT, handleAutofillEvent);
      isListenerAttached = false;
    };
  }, [chatHistory]);

  // useEffect(() => {
  //   if (q) {
      // handleAutofillEvent({ detail: { command: q } });
    // }
  // }, [q]);

  if (loading) {
    return (
      <div className="allm-flex allm-flex-col allm-h-full">
        <ChatPageHeader
          sessionId={sessionId}
          settings={settings}
          iconUrl={settings.brandImageUrl}
          closeChat={closeChat}
          onStartNewChat={onStartNewChat}
          onNavigate={onNavigate}
        />
        <ChatHistoryLoading />
        <Sponsor />
      </div>
    );
  }

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-text-sm">
      {!settings.noHeader && (
        <ChatPageHeader
          sessionId={sessionId}
          settings={settings}
          iconUrl={settings.brandImageUrl}
          closeChat={closeChat}
          onStartNewChat={onStartNewChat}
          onNavigate={onNavigate}
        />
      )}
      <div className="allm-flex-grow allm-overflow-y-auto">
        <ChatContainer
          sessionId={sessionId}
          settings={settings}
          clientUserId={clientUserId}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          loadingResponse={loadingResponse}
          setLoadingResponse={setLoadingResponse}
        />
      </div>
      <div className="allm-flex allm-flex-col allm-gap-y-2.5 allm-h-[98px] allm-w-full allm-pt-4">
        <PromptInput
          settings={settings}
          message={message}
          submit={handleSubmit}
          onChange={handleMessageChange}
          inputDisabled={loadingResponse}
          buttonDisabled={loadingResponse}
        />
        <Sponsor />
      </div>
    </div>
  );
}
