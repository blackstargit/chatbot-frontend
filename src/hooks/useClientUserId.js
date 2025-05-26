import { useEffect, useState } from "react";
import { embedderSettings } from "../main"; // Assuming embedderSettings is accessible like this
import { v4 as uuidv4 } from "uuid"; // Use alias for clarity

export default function useClientUserId() {
  const [clientUserId, setClientUserId] = useState("");

  useEffect(() => {
    function getOrAssignClientUserId() {
      // Ensure window and embedId are available
      if (typeof window === "undefined" || !embedderSettings?.settings?.embedId) {
        console.warn("useClientUserId: Window or embedId not available yet.");
        return;
      }

      const embedId = embedderSettings.settings.embedId;
      const STORAGE_IDENTIFIER = `allm_${embedId}_client_user_id`; // Distinct key from session_id

      const currentId = window.localStorage.getItem(STORAGE_IDENTIFIER);
      if (!!currentId) {
        // console.log(`Resuming client_user_id`, currentId);
        setClientUserId(currentId);
        return;
      }

      const newId = uuidv4();
      // console.log(`Registering new client_user_id for embed ${embedId}:`, newId);
      window.localStorage.setItem(STORAGE_IDENTIFIER, newId);
      setClientUserId(newId);
    }

    getOrAssignClientUserId();
  }, [embedderSettings?.settings?.embedId]);

  return clientUserId;
}
