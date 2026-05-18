const pageContexts = {};

chrome.runtime.onInstalled.addListener(() => {
  console.log("Context-Aware Browser Assistant extension installed");

  chrome.contextMenus.create({
    id: "explainSelection",
    title: "Explain with Context-Aware Browser Assistant",
    contexts: ["selection"]
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PAGE_CONTEXT") {
    const tabId = sender.tab?.id;

    if (tabId) {
      pageContexts[tabId] = message.data;
      console.log("Stored page context for tab:", tabId);
    }

    sendResponse({ success: true });
    return true;
  }

  if (message.type === "SUMMARIZE_ACTIVE_TAB") {
    (async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab?.id) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        const context = pageContexts[tab.id];

        if (!context) {
          sendResponse({
            success: false,
            error: "No page context found for this tab. Refresh the page first.",
          });
          return;
        }

        const { title, url, content } = context;

        const prompt = `Summarize this webpage in a clean, helpful way.

Title: ${title}
URL: ${url}

Content:
${content}`;

        const response = await fetch("http://127.0.0.1:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            model: "llama3.2",
            prompt,
            stream: false,
          }),
        });

        const rawText = await response.text();

        if (!rawText || !rawText.trim()) {
          sendResponse({
            success: false,
            error: "Ollama returned an empty response.",
          });
          return;
        }

        const data = JSON.parse(rawText);

        if (!response.ok) {
          sendResponse({
            success: false,
            error: data?.error || `HTTP ${response.status}`,
          });
          return;
        }

        const aiResponse = data?.response;

        if (!aiResponse) {
          sendResponse({
            success: false,
            error: "No summary returned from Ollama.",
          });
          return;
        }

        sendResponse({
          success: true,
          aiResponse,
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    })();

    return true;
  }

  if (message.type === "ASK_ACTIVE_TAB") {
    (async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab?.id) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        const context = pageContexts[tab.id];

        if (!context) {
          sendResponse({
            success: false,
            error: "No page context found for this tab. Refresh the page first.",
          });
          return;
        }

        const { title, url, content } = context;
        const question = message.question;

        if (!question || !question.trim()) {
          sendResponse({
            success: false,
            error: "Question is empty.",
          });
          return;
        }

        const prompt = `You are helping the user understand the current webpage.

Webpage title: ${title}
Webpage URL: ${url}

Webpage content:
${content}

User question:
${question}

Answer clearly and only use the webpage context above. If the answer is not in the page content, say that it is not clearly stated on the page.`;

        const response = await fetch("http://127.0.0.1:11434/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            model: "llama3.2",
            prompt,
            stream: false,
          }),
        });

        const rawText = await response.text();

        if (!rawText || !rawText.trim()) {
          sendResponse({
            success: false,
            error: "Ollama returned an empty response.",
          });
          return;
        }

        const data = JSON.parse(rawText);

        if (!response.ok) {
          sendResponse({
            success: false,
            error: data?.error || `HTTP ${response.status}`,
          });
          return;
        }

        const aiResponse = data?.response;

        if (!aiResponse) {
          sendResponse({
            success: false,
            error: "No answer returned from Ollama.",
          });
          return;
        }

        sendResponse({
          success: true,
          aiResponse,
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    })();

    return true;
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "explainSelection") return;

  const selectedText = info.selectionText;

  console.log("Context menu clicked");
  console.log("Selected text:", selectedText);

  if (!selectedText || !selectedText.trim()) {
    console.log("No selected text found.");
    return;
  }

  if (!tab?.id) {
    console.log("No active tab id found.");
    return;
  }

  try {
    const prompt = `Explain the following selected text in a clear, simple, helpful way.

Selected text:
${selectedText}`;

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt,
        stream: false,
      }),
    });

    const rawText = await response.text();
    console.log("Selection explain status:", response.status);
    console.log("Selection explain raw response:", rawText);

    if (!rawText || !rawText.trim()) {
      throw new Error("Ollama returned an empty response.");
    }

    const data = JSON.parse(rawText);

    if (!response.ok) {
      throw new Error(data?.error || `HTTP ${response.status}`);
    }

    const explanation = data?.response || "No explanation returned.";
    console.log("Selection explanation:", explanation);

    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_EXPLANATION_PANEL",
      data: explanation,
    });
  } catch (error) {
    console.error("Selection explain failed:", error);

    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_EXPLANATION_PANEL",
      data:
        error instanceof Error
          ? `Error: ${error.message}`
          : "Unknown error occurred.",
    });
  }
});