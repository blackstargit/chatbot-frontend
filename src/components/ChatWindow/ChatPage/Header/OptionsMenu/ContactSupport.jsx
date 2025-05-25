import React from "react";
import { Envelope } from "@phosphor-icons/react";

export default function ContactSupport({ email = null }) {
  if (!email) return null;

  const subject = `Inquiry from ${window.location.origin}`;
  return (
    <a
      href={`mailto:${email}?Subject=${encodeURIComponent(subject)}`}
      className="allm-no-underline hover:allm-underline hover:allm-cursor-pointer allm-bg-white allm-gap-x-[12px] hover:allm-bg-gray-100 allm-rounded-lg allm-border-none allm-flex allm-items-center allm-text-base allm-text-[#7A7D7E] allm-font-bold allm-px-4 allm-py-2"
      aria-label="Email Support"
    >
      <Envelope size={24} />
      <p className="allm-text-[14px]">Email Support</p>
    </a>
  );
}
