import { fetchEventSource } from "@microsoft/fetch-event-source";
import { v4 } from "uuid";

const ChatService = {
  embedSessionHistory: async function (embedSettings, sessionId) {
    const { embedId, baseApiUrl } = embedSettings;
    return await fetch(`${baseApiUrl}/${embedId}/${sessionId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Invalid response from server");
      })
      .then((res) => {
        return res.history.map((msg) => ({
          ...msg,
          id: v4(),
          sender: msg.role === "user" ? "user" : "system",
          textResponse: msg.content,
          close: false,
        }));
      })
      .catch((e) => {
        console.error(e);
        return [];
      });
  },
  resetEmbedChatSession: async function (embedSettings, sessionId) {
    const { baseApiUrl, embedId } = embedSettings;
    return await fetch(`${baseApiUrl}/${embedId}/${sessionId}`, {
      method: "DELETE",
    })
      .then((res) => res.ok)
      .catch(() => false);
  },
  streamChat: async function (sessionId, embedSettings, message, handleChat, clientUserId) {
    const { baseApiUrl, embedId, username } = embedSettings;
    const overrides = {
      prompt: embedSettings?.prompt ?? null,
      model: embedSettings?.model ?? null,
      temperature: embedSettings?.temperature ?? null,
    };

    if (!clientUserId) {
      console.error("streamChat called without clientUserId.");
      handleChat({
        id: uuidv4(),
        type: "abort",
        textResponse: "Client identifier is missing. Cannot start chat.",
        sources: [],
        close: true,
        error: "Client identifier is missing.",
      });
      return; // Abort if no clientUserId
    }

    const ctrl = new AbortController();
    await fetchEventSource(`${baseApiUrl}/${embedId}/stream-chat`, {
      method: "POST",
      body: JSON.stringify({
        sessionId,
        clientUserId, 
        message,
        username,
        ...overrides,
      }),
      signal: ctrl.signal,
      openWhenHidden: true,
      async onopen(response) {
        if (response.ok) {
          return; // everything's good
        } else if (response.status >= 400) {
          await response
            .json()
            .then((serverResponse) => {
              handleChat(serverResponse);
            })
            .catch(() => {
              handleChat({
                id: v4(),
                type: "abort",
                textResponse: null,
                sources: [],
                close: true,
                error: `An error occurred while streaming response. Code ${response.status}`,
              });
            });
          ctrl.abort();
          throw new Error();
        } else {
          handleChat({
            id: v4(),
            type: "abort",
            textResponse: null,
            sources: [],
            close: true,
            error: `An error occurred while streaming response. Unknown Error.`,
          });
          ctrl.abort();
          throw new Error("Unknown Error");
        }
      },
      async onmessage(msg) {
        try {
          const chatResult = JSON.parse(msg.data);
          handleChat(chatResult);
        } catch {}
      },
      onerror(err) {
        handleChat({
          id: v4(),
          type: "abort",
          textResponse: null,
          sources: [],
          close: true,
          error: `An error occurred while streaming response. ${err.message}`,
        });
        ctrl.abort();
        throw new Error();
      },
    });
  },
  getUserChatSessions: async function (embedSettings, clientUserId, limit = 20, offset = 0) {
    const { baseApiUrl, embedId } = embedSettings;
    if (!clientUserId) {
      console.error("getUserChatSessions called without clientUserId.");
      return { chats: [] }; // Return a structure consistent with expected response
    }
    try {
      const response = await fetch(`${baseApiUrl}/${embedId}/user/${clientUserId}/chats?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        let errorDetail = `Failed to fetch user chat sessions. Status: ${response.status}`;
        try {
          const errorJson = await response.json();
          errorDetail = errorJson.detail || errorDetail;
        } catch (e) {}
        throw new Error(errorDetail);
      }
      return await response.json(); // Expects { chats: [...] }
    } catch (e) {
      console.error("Error fetching user chat sessions:", e);
      return { chats: [] }; // Return default structure on error
    }
  },
  getLatestChatPreview: async function (embedSettings, clientUserId) {
    const { baseApiUrl, embedId } = embedSettings;
    if (!clientUserId) {
      console.error("getLatestChatPreview called without clientUserId.");
      return null;
    }
    try {
      // Call the existing /chats endpoint with limit=1
      const response = await fetch(`${baseApiUrl}/${embedId}/user/${clientUserId}/chats?limit=1&offset=0`);
      if (!response.ok) {
        if (response.status === 404) {
          console.log("No latest chat preview found for user (API returned 404 for /chats?limit=1).");
          return null;
        }
        let errorDetail = `Failed to fetch latest chat preview. Status: ${response.status}`;
        try {
          const errorJson = await response.json();
          errorDetail = errorJson.detail || errorDetail;
        } catch (e) {
          /* ignore */
        }
        throw new Error(errorDetail);
      }
      const responseData = await response.json(); // Expects { chats: [...] }
      if (responseData && responseData.chats && responseData.chats.length > 0) {
        return responseData.chats[0]; // Return the first (and only) chat session object
      }
      return null; // No chats found
    } catch (e) {
      console.error("Error fetching latest chat preview:", e);
      return null;
    }
  },
};

export default ChatService;
