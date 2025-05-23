import useGetScriptAttributes from "@/hooks/useScriptAttributes";
// import useSessionId from "@/hooks/useSessionId";
import useOpenChat from "@/hooks/useOpen";
import Head from "@/components/Head";
import OpenButton from "@/components/OpenButton";
import ChatWindow from "./components/ChatWindow";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "@/i18n";
import { HashRouter as Router } from "react-router-dom";


export default function App() {
  const { isChatOpen, toggleOpenChat } = useOpenChat();
  const embedSettings = useGetScriptAttributes();

  useEffect(() => {
    if (embedSettings.openOnLoad === "on") {
      toggleOpenChat(true);
    }
  }, [embedSettings.loaded]);

  if (!embedSettings.loaded) return null;

  const positionClasses = {
    "bottom-left": "allm-bottom-0 allm-left-0 allm-ml-4",
    "bottom-right": "allm-bottom-0 allm-right-0 allm-mr-4",
    "top-left": "allm-top-0 allm-left-0 allm-ml-4 allm-mt-4",
    "top-right": "allm-top-0 allm-right-0 allm-mr-4 allm-mt-4",
  };

  const position = embedSettings.position || "bottom-right";
  const windowWidth = embedSettings.windowWidth ?? "400px";
  const windowHeight = embedSettings.windowHeight ?? "700px";

  return (
    <I18nextProvider i18n={i18next}>
      <Router>
        <Head />
        <div id="anything-llm-embed-chat-container" className={`allm-fixed allm-inset-0 allm-z-50 ${isChatOpen ? "allm-block" : "allm-hidden"}`}>
          <div
            style={{
              maxWidth: windowWidth,
              maxHeight: windowHeight,
              height: "100%",
            }}
            className={`allm-h-full allm-w-full allm-bg-white allm-fixed allm-bottom-0 allm-right-0 allm-mb-4 allm-md:mr-4 allm-rounded-2xl allm-border allm-border-gray-300 allm-shadow-[0_4px_14px_rgba(0,0,0,0.25)] allm-flex allm-flex-col ${positionClasses[position]}`}
            id="anything-llm-chat"
          >
            {isChatOpen && (
              // session id already implemented. just need to add a table in db for all session ids of a user, a new session id is generated at reset chat which will be reprposed for new chat
              <ChatWindow closeChat={() => toggleOpenChat(false)} settings={embedSettings} />
            )}
          </div>
        </div>
        {!isChatOpen && (
          <div id="anything-llm-embed-chat-button-container" className={`allm-fixed allm-bottom-0 ${positionClasses[position]} allm-mb-4 allm-z-50`}>
            <OpenButton settings={embedSettings} isOpen={isChatOpen} toggleOpen={() => toggleOpenChat(true)} />
          </div>
        )}
      </Router>
    </I18nextProvider>
  );
}
