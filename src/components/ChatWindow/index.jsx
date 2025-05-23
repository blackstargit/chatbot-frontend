import ChatWindowHeader from "./ChatPage/Header";
import SessionId from "../SessionId";
import useChatHistory from "@/hooks/chat/useChatHistory";
import ChatContainer from "./ChatPage/ChatContainer";
import Sponsor from "../Sponsor";
import { ChatHistoryLoading } from "./ChatPage/ChatContainer/ChatHistory";
// import ResetChat from "../ResetChat";
import NavigationBar from "./Shared/Footer";

// implement another hook for active screen in local storage and use it here
// this is the main for this codebase
// implement routing here

export default function ChatWindow({ closeChat, settings, sessionId }) {
  // fetch all chats history if last active page is messages
  // fetch recent chat name if last active page is home
  // fetch recent chats history if last active page is chat
  const { chatHistory, setChatHistory, loading } = useChatHistory(
    settings,
    sessionId
  );

  // see if loading is needed for home page since only recent messages needs to be fetched.
  if (loading) {
    return (
      <div className="allm-flex allm-flex-col allm-h-full">
        {/* Header component place*/}
        <ChatWindowHeader
          sessionId={sessionId}
          settings={settings}
          iconUrl={settings.brandImageUrl}
          closeChat={closeChat}
          setChatHistory={setChatHistory}
        />
        <ChatHistoryLoading />
        <div className="allm-pt-4 allm-pb-2 allm-h-fit allm-gap-y-1">
          <SessionId />
          <Sponsor settings={settings} />
        </div>
      </div>
    );
  }

  // no code snippets so this is unnecessary.
  setEventDelegatorForCodeSnippets();

  return (
    <div className="allm-flex allm-flex-col allm-h-full allm-font-sans allm-text-sm">
      {/* Header component place*/}
      {!settings.noHeader && (
        <ChatWindowHeader sessionId={sessionId} settings={settings} iconUrl={settings.brandImageUrl} closeChat={closeChat} setChatHistory={setChatHistory} />
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
          {/* <ResetChat
          setChatHistory={setChatHistory}
          settings={settings}
          sessionId={sessionId}
          closeChat={closeChat}
        /> */}
        </div>
      </div>
    </div>
  );
}




// Enables us to safely markdown and sanitize all responses without risk of injection
// but still be able to attach a handler to copy code snippets on all elements
// that are code snippets.
function copyCodeSnippet(uuid) {
  const target = document.querySelector(`[data-code="${uuid}"]`);
  if (!target) return false;

  const markdown =
    target.parentElement?.parentElement?.querySelector(
      "pre:first-of-type"
    )?.innerText;
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
