# 🧠 Context-Aware Browser Assistant

<p>
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Extension-Chrome%20Manifest%20V3-green?logo=googlechrome"/>
  <img src="https://img.shields.io/badge/LLM-Ollama-orange"/>
  <img src="https://img.shields.io/badge/Model-Llama%203.2-blue"/>
  <img src="https://img.shields.io/badge/Architecture-Context%20Aware%20AI-purple"/>
  <img src="https://img.shields.io/badge/Privacy-Zero%20API%20Calls-red"/>
</p>

---

## 🚀 Building a Privacy-First AI Browser Assistant

This project presents a context-aware AI browser assistant that brings local LLM intelligence directly into the browser using Chrome Extension APIs, Ollama, and Llama 3.2.

The extension can summarize webpages, answer questions about live page content, and explain highlighted text directly inside webpages using a floating contextual AI panel.

Unlike cloud-based browser assistants that require external APIs and data transfer, this system performs all inference locally through Ollama, enabling privacy-first AI interactions with zero external API calls.

The architecture combines:
- Chrome Manifest V3
- Context-aware DOM extraction
- Local LLM inference using Ollama
- Background service worker orchestration
- Content script integration
- Floating AI explanation panels
- Popup-based contextual Q&A workflows

---

## 🎯 Why This Project Matters

Most browser AI assistants rely heavily on cloud APIs and external inference services.

This creates problems such as:
- Privacy concerns
- API costs
- Latency
- Data transmission risks
- Dependency on hosted AI providers

This project demonstrates how modern browser extensions can integrate local LLMs directly into user workflows.

The system enables:
- Fully local AI inference
- Context-aware browsing assistance
- Real-time webpage summarization
- AI-powered contextual explanations
- Zero cloud dependency
- Privacy-preserving AI interactions

---

## 📊 Project Snapshot

- **Project Type:** AI Browser Assistant
- **Architecture:** Chrome Extension (Manifest V3)
- **Frontend:** React + TypeScript
- **LLM Runtime:** Ollama
- **Model:** Llama 3.2
- **Inference Type:** Local LLM Inference
- **Key Capability:** Context-Aware AI Assistance
- **Core Features:** Summarization, contextual Q&A, floating explanations
- **Privacy Model:** Zero external API calls

---

## 🎬 Demo Workflow

### Example Usage Flow

1. Open any webpage
2. Highlight a paragraph
3. Right-click → **Explain with Context-Aware Browser Assistant**
4. AI explanation appears in a floating panel directly on the page

The extension can also:
- summarize entire webpages
- answer questions about live content
- provide contextual explanations using page DOM information

---

## ✨ Core Features

### 1. Context-Aware AI Assistance
- Extracts live webpage content using DOM access
- Uses page context for grounded AI responses
- Improves contextual relevance

### 2. Local LLM Inference
- Runs fully through Ollama
- Uses Llama 3.2 locally
- No OpenAI or cloud API dependency

### 3. Page Summarization
- One-click webpage summarization
- Context-aware summaries using live content

### 4. Contextual Q&A
- Ask questions about currently opened webpages
- Responses generated using extracted page context

### 5. Right-Click Explain Workflow
- Highlight text on webpages
- Right-click contextual explanation support
- Fast inline AI assistance

### 6. Floating AI Panel
- Non-intrusive UI overlay
- Dynamic explanation rendering
- Contextual inline assistance

### 7. Background Service Worker
- Handles extension orchestration
- Sends prompts to Ollama
- Manages AI request lifecycle

### 8. Content Script Integration
- Extracts webpage DOM content
- Injects contextual floating panel
- Enables real-time interaction with webpages

---

## 🏗️ System Architecture

```text
Webpage
   │
   │ (DOM extraction)
   ▼
Content Script
   │
   │ (page context + selected text)
   ▼
Background Service Worker      ←──── Context Menu API
   │                                  (right-click trigger)
   │ (AI request)
   ▼
Ollama Local API (localhost:11434)
   │
   │ (AI response)
   ▼
Popup UI / Floating Panel
```

---

## ⚙️ Component Responsibilities

| Component | Role |
|-----------|------|
| Content Script | Extracts page text and injects floating explanation panel |
| Background Service Worker | Handles orchestration, prompts, and AI request routing |
| Popup UI | React-based extension interface for summaries and contextual Q&A |
| Context Menu API | Right-click AI explanation trigger |
| Ollama REST API | Local LLM inference using `localhost:11434` |

---

## 🧠 Tech Stack

- React
- TypeScript
- Chrome Extension APIs
- Manifest V3
- Ollama
- Llama 3.2
- Vite
- Tailwind CSS
- DOM APIs
- Content Scripts

---

## 📂 Repository Structure

```text
context-aware-browser-assistant/
│
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js
├── index.html
│
├── public/
│   ├── background.js
│   ├── contentScript.js
│   ├── manifest.json
│   └── icons/
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   │
│   ├── assets/
│   └── components/
│
└── dist/
```

---

## ▶️ How to Run

### 1. Clone Repository

```bash
git clone https://github.com/sucharitha1812/context-aware-browser-assistant.git
cd context-aware-browser-assistant
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Build Extension

```bash
npm run build
```

---

### 4. Install Ollama

Install Ollama locally and pull Llama 3.2:

```bash
ollama pull llama3.2
```

---

### 5. Load Extension in Chrome

1. Open:

```text
chrome://extensions/
```

2. Enable **Developer Mode**

3. Click **Load unpacked**

4. Select the:

```text
dist/
```

folder

---

## 🎮 Usage

### Summarize Current Page

1. Open any webpage
2. Click extension popup
3. Select **Summarize Current Page**

---

### Ask Questions About Page Content

1. Open popup UI
2. Ask contextual questions
3. Receive AI-generated answers using live page content

Example:
```text
What are the key points of this article?
```

---

### Explain Highlighted Text

1. Highlight any webpage text
2. Right-click selected content
3. Choose:
```text
Explain with Context-Aware Browser Assistant
```
4. Floating explanation panel appears on the webpage

---

## 🔒 Privacy & Security

This project is designed privacy-first.

### Privacy Features

- Zero external API calls
- No telemetry
- No analytics tracking
- Fully local inference
- No cloud dependency
- No persistent page-content storage

### Security Benefits

- Sensitive browsing data remains local
- No third-party AI inference providers
- No external transmission of webpage content

---

## 💼 Business Impact

- Demonstrates privacy-preserving AI workflows
- Enables local AI-powered productivity tooling
- Reduces dependency on cloud inference APIs
- Improves contextual browsing assistance
- Demonstrates modern browser extension engineering
- Shows practical integration of LLMs into real-world workflows

---

## 🛠️ Skills Demonstrated

- Browser Extension Development
- Chrome Manifest V3
- React
- TypeScript
- Ollama
- Local LLM Integration
- Context-Aware AI Systems
- DOM Manipulation
- Content Script Development
- Background Service Workers
- Frontend Engineering
- AI Workflow Integration

---

## ⚠️ Limitations

- Requires Ollama installed locally
- Depends on browser extension permissions
- Large webpages may increase processing time
- Local inference performance depends on system hardware
- Currently optimized for Chrome-based browsers

---

## 🔮 Future Improvements

- Draggable floating AI panel
- Persistent AI sidebar
- Multi-model support
- Multi-tab contextual understanding
- Citation-based responses
- Source highlighting
- Streaming AI responses
- Cross-browser support

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built by Sucharitha Reddy Gaddam

- GitHub: https://github.com/sucharitha1812

---

## ✅ Conclusion

This project demonstrates how modern browser extensions can integrate local LLMs directly into browsing workflows using Chrome Extension APIs, Ollama, and context-aware DOM interaction.

By combining local inference, contextual AI assistance, floating UI panels, and privacy-first architecture, the system provides a strong example of practical AI-powered browser productivity tooling without relying on external APIs.