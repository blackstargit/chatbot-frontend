import { useEffect } from "react";

export default function useNewSessionId({ newSessionId }) {
  if (!window || !embedderSettings?.settings?.embedId) return;

  const STORAGE_IDENTIFIER = `allm_${embedderSettings?.settings?.embedId}_session_id`;
  const currentId = window.localStorage.setItem(STORAGE_IDENTIFIER, newSessionId);

  return currentId;
}
