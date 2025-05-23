import { CHAT_UI_REOPEN } from "@/utils/constants";
import { useState } from "react";

// this is where chat open state is stored, use this to control the open state of the complete bot instead
export default function useOpenChat() {
  const [isOpen, setOpen] = useState(
    !!window?.localStorage?.getItem(CHAT_UI_REOPEN) || false
  );

  function toggleOpenChat(newValue) {
    if (newValue === true) window.localStorage.setItem(CHAT_UI_REOPEN, "1");
    if (newValue === false) window.localStorage.removeItem(CHAT_UI_REOPEN);
    setOpen(newValue);
  }

  return { isChatOpen: isOpen, toggleOpenChat };
}
