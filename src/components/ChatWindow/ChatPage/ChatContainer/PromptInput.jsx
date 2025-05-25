import { CircleNotch } from "@phosphor-icons/react";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ArrowUp from "@/assets/arrow-up.svg";

export default function PromptInput({
  settings,
  message,
  submit,
  onChange,
  inputDisabled,
  buttonDisabled,
}) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const textareaRef = useRef(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!inputDisabled && textareaRef.current) {
      textareaRef.current.focus();
    }
    resetTextAreaHeight();
  }, [inputDisabled]);

  const handleSubmit = (e) => {
    setFocused(false);
    submit(e);
  };

  const resetTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const captureEnter = (event) => {
    if (event.keyCode == 13) {
      if (!event.shiftKey) {
        submit(event);
      }
    }
  };

  const adjustTextArea = (event) => {
    const element = event.target;
    element.style.height = "auto";
    element.style.height =
      event.target.value.length !== 0 ? element.scrollHeight + "px" : "auto";
  };

  return (
    <div className="allm-w-full allm-h-[52px] allm-sticky allm-bottom-0 allm-z-10 allm-flex allm-justify-center allm-items-center allm-bg-white">
      <form onSubmit={handleSubmit} className="allm-flex allm-flex-col allm-gap-y-1 allm-rounded-t-[40px] allm-w-full allm-items-center allm-justify-center">
        <div className="allm-flex allm-items-center allm-w-full">
          <div className="allm-bg-white allm-flex allm-flex-col allm-px-6 allm-overflow-hidden allm-w-full">
            <div
              className="allm-flex allm-items-center allm-px-[25px] allm-py-1 allm-rounded-[40px] allm-transition-all allm-duration-200 allm-border-black"
              style={{
                borderWidth: focused ? "1.5px" : "0.5px",
                borderStyle: "solid",
                borderColor: focused ? "black" : "gray",
              }}
            >
              <textarea
                ref={textareaRef}
                onKeyUp={adjustTextArea}
                onKeyDown={captureEnter}
                onChange={onChange}
                required={true}
                disabled={inputDisabled}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  setFocused(false);
                  adjustTextArea(e);
                }}
                value={message}
                className="allm-font-sans allm-border-none allm-leading-[19.6px] allm-pt-[20px] allm-flex allm-cursor-text allm-max-h-[100px] allm-text-sm allm-w-full allm-text-black-text allm-bg-transparent placeholder:allm-text-slate-800/60 allm-resize-none active:allm-outline-none focus:allm-outline-none allm-flex-grow"
                placeholder={settings.sendMessageText || t("chat.send-message")}
                id="message-input"
              />
              <button
                ref={formRef}
                type="submit"
                disabled={buttonDisabled}
                className="allm-bg-transparent allm-border-none allm-inline-flex allm-justify-center allm-rounded-[40px] allm-cursor-pointer allm-text-black-text group"
                id="send-message-button"
                aria-label="Send message"
              >
                {buttonDisabled ? (
                  <CircleNotch className="allm-w-4 allm-h-4 allm-animate-spin" />
                ) : (
                  <img
                    src={ArrowUp}
                    className={`allm-w-9 allm-h-9 transition-all transition-opacity duration-200 ${focused ? "allm-opacity-100" : "allm-opacity-50"}`}
                    alt="prompt input button"
                  />
                )}
                <span className="allm-sr-only">Send message</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
