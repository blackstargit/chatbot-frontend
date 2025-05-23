import React, { useEffect } from "react";
import handleChat from "@/utils/chat";
import ChatService from "@/models/chatService";
import ChatHistory from "@/components/ChatWindow/ChatPage/ChatContainer/ChatHistory";

export const SEND_TEXT_EVENT = "anythingllm-embed-send-prompt";

export default function ChatContainer({ sessionId, settings, chatHistory, setChatHistory, loadingResponse, setLoadingResponse }) {
  useEffect(() => {
    async function fetchReply() {
      const promptMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
      const remHistory = chatHistory.length > 0 ? chatHistory.slice(0, -1) : [];
      const _chatHistory = [...remHistory];

      if (!promptMessage || !promptMessage?.userMessage) {
        setLoadingResponse(false);
        return;
      }

      await ChatService.streamChat(sessionId, settings, promptMessage.userMessage, (chatResult) =>
        handleChat(chatResult, setLoadingResponse, setChatHistory, remHistory, _chatHistory)
      );
    }

    loadingResponse === true && fetchReply();
  }, [loadingResponse, chatHistory]);

  return (
    <div className="allm-h-full allm-w-full allm-flex allm-flex-col">
      <div className="allm-flex-1 allm-min-h-0">
        <ChatHistory settings={settings} history={chatHistory} />
      </div>
    </div>
  );
}
