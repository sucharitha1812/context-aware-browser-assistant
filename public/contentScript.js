console.log("Context-Aware Browser Assistant content script running");

function getPageContext() {
  const title = document.title;
  const url = window.location.href;

  const text = document.body.innerText
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3000);

  return {
    title,
    url,
    content: text,
  };
}

const context = getPageContext();

console.log("Page context being sent:", context);

chrome.runtime.sendMessage(
  {
    type: "PAGE_CONTEXT",
    data: context,
  },
  (response) => {
    if (chrome.runtime.lastError) {
      console.error("Message send failed:", chrome.runtime.lastError.message);
      return;
    }

    console.log("Background response:", response);
  }
);

function removeExistingContextFlowPanel() {
  const existing = document.getElementById("contextflow-ai-panel");
  if (existing) {
    existing.remove();
  }
}

function createContextFlowPanel(text) {
  removeExistingContextFlowPanel();

  const panel = document.createElement("div");
  panel.id = "contextflow-ai-panel";

  panel.style.position = "fixed";
  panel.style.top = "20px";
  panel.style.right = "20px";
  panel.style.width = "380px";
  panel.style.maxHeight = "70vh";
  panel.style.overflowY = "auto";
  panel.style.background = "#111827";
  panel.style.color = "#ffffff";
  panel.style.border = "1px solid #374151";
  panel.style.borderRadius = "16px";
  panel.style.boxShadow = "0 20px 50px rgba(0,0,0,0.35)";
  panel.style.zIndex = "2147483647";
  panel.style.padding = "16px";
  panel.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "12px";

  const title = document.createElement("div");
  title.textContent = "Context-Aware Browser Assistant";
  title.style.fontSize = "18px";
  title.style.fontWeight = "700";

  const closeButton = document.createElement("button");
  closeButton.textContent = "×";
  closeButton.style.background = "transparent";
  closeButton.style.border = "none";
  closeButton.style.color = "#ffffff";
  closeButton.style.fontSize = "24px";
  closeButton.style.cursor = "pointer";
  closeButton.style.lineHeight = "1";
  closeButton.onclick = () => panel.remove();

  header.appendChild(title);
  header.appendChild(closeButton);

  const subtitle = document.createElement("div");
  subtitle.textContent = "Selected text explanation";
  subtitle.style.fontSize = "13px";
  subtitle.style.color = "#9ca3af";
  subtitle.style.marginBottom = "12px";

  const content = document.createElement("div");
  content.textContent = text;
  content.style.whiteSpace = "pre-wrap";
  content.style.lineHeight = "1.6";
  content.style.fontSize = "14px";
  content.style.background = "#1f2937";
  content.style.padding = "14px";
  content.style.borderRadius = "12px";
  content.style.border = "1px solid #374151";

  panel.appendChild(header);
  panel.appendChild(subtitle);
  panel.appendChild(content);

  document.body.appendChild(panel);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SHOW_EXPLANATION_PANEL") {
    createContextFlowPanel(message.data);
    sendResponse({ success: true });
    return true;
  }

  if (message.type === "REMOVE_EXPLANATION_PANEL") {
    removeExistingContextFlowPanel();
    sendResponse({ success: true });
    return true;
  }
});