import { useState } from "react";

type AiResponse = {
  success: boolean;
  aiResponse?: string;
  error?: string;
};

function App() {
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [error, setError] = useState("");

  const extensionAvailable =
    typeof chrome !== "undefined" && !!chrome.runtime?.sendMessage;

  const summarizeCurrentPage = () => {
    if (!extensionAvailable) {
      setError(
        "Chrome extension APIs are only available inside the loaded extension popup, not in localhost dev mode."
      );
      return;
    }

    setLoadingSummary(true);
    setError("");
    setSummary("");

    chrome.runtime.sendMessage(
      { type: "SUMMARIZE_ACTIVE_TAB" },
      (response: AiResponse) => {
        setLoadingSummary(false);

        if (chrome.runtime.lastError) {
          setError(
            chrome.runtime.lastError.message ?? "Unknown Chrome runtime error."
          );
          return;
        }

        if (!response) {
          setError("No response from background script.");
          return;
        }

        if (!response.success) {
          setError(response.error || "Something went wrong.");
          return;
        }

        setSummary(response.aiResponse || "");
      }
    );
  };

  const askAboutPage = () => {
    if (!extensionAvailable) {
      setError(
        "Chrome extension APIs are only available inside the loaded extension popup, not in localhost dev mode."
      );
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question first.");
      return;
    }

    setLoadingAnswer(true);
    setError("");
    setAnswer("");

    chrome.runtime.sendMessage(
      { type: "ASK_ACTIVE_TAB", question },
      (response: AiResponse) => {
        setLoadingAnswer(false);

        if (chrome.runtime.lastError) {
          setError(
            chrome.runtime.lastError.message ?? "Unknown Chrome runtime error."
          );
          return;
        }

        if (!response) {
          setError("No response from background script.");
          return;
        }

        if (!response.success) {
          setError(response.error || "Something went wrong.");
          return;
        }

        setAnswer(response.aiResponse || "");
      }
    );
  };

  return (
    <div className="w-[380px] h-[560px] bg-zinc-950 text-white p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Context-Aware Browser Assistant</h1>
      <p className="text-sm text-zinc-400 mb-4">
        Summarize and ask questions about the current page using local AI.
      </p>

      {!extensionAvailable && (
        <div className="mb-4 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-200">
          You are running this in Vite dev mode. The UI preview works here, but
          Chrome extension features only work from the loaded extension popup in
          chrome://extensions.
        </div>
      )}

      <button
        onClick={summarizeCurrentPage}
        disabled={loadingSummary}
        className="w-full rounded-xl bg-white text-black font-medium py-3 px-4 hover:bg-zinc-200 disabled:opacity-50"
      >
        {loadingSummary ? "Summarizing..." : "Summarize Current Page"}
      </button>

      <div className="mt-4">
        <label className="text-sm font-semibold text-zinc-300 block mb-2">
          Ask about this page
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What is this page about? What are the key sections?"
          className="w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-3 text-sm text-white placeholder:text-zinc-500 outline-none min-h-[100px]"
        />
        <button
          onClick={askAboutPage}
          disabled={loadingAnswer}
          className="w-full mt-3 rounded-xl bg-zinc-200 text-black font-medium py-3 px-4 hover:bg-white disabled:opacity-50"
        >
          {loadingAnswer ? "Asking AI..." : "Ask AI"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300 whitespace-pre-wrap">
          {error}
        </div>
      )}

      {summary && (
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-zinc-300 mb-2">Summary</h2>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 text-sm leading-6 whitespace-pre-wrap break-words">
            {summary}
          </div>
        </div>
      )}

      {answer && (
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-zinc-300 mb-2">Answer</h2>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4 text-sm leading-6 whitespace-pre-wrap break-words">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;