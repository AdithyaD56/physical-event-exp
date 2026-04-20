# ⚡ Crowd Pulse X — Intelligent Stadium Experience Platform

> “Spend less time waiting. More time enjoying the game.”

**Crowd Pulse X** is a next-generation, production-grade event intelligence platform built for the **Physical Event Experience** challenge. It transforms the way fans experience large sporting venues by intelligently managing crowd movement, reducing waiting times, optimizing navigation, and enabling real-time coordination.

At the center of the experience is **AETHER**, the built-in AI assistant that acts as a live stadium guide, crowd analyst, and emergency response companion.

---

## 🎯 Chosen Vertical

**Physical Event Experience**

Crowd Pulse X addresses the major problems attendees face inside large venues:
- Long lines at gates, food stalls, restrooms, and parking exits.
- Confusing venue layouts and difficult navigation.
- Crowd bottlenecks during entry, halftime, and post-event exit.
- Lack of live information and recommendations.
- Poor accessibility for elderly and differently-abled users.

### Solution
Crowd Pulse X solves these issues through:
- **Real-time crowd heatmaps**
- **Intelligent queue prediction**
- **AETHER — AI-powered stadium assistant**
- **Smart navigation and BFS route optimization**
- **Accessibility-first features**
- **Emergency evacuation intelligence**

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16 (App Router + Turbopack)** |
| Language | **TypeScript 5+** |
| Styling | **Tailwind CSS 4** |
| UI Components | **Shadcn UI** |
| Animation | **Framer Motion** |
| Icons | **Lucide React** |
| AI | **Google Gemini API (`gemini-1.5-flash-latest`)** |
| State | **Zustand + Persist Middleware** |
| Charts | **Recharts** |
| Maps & Routing | **SVG Tactical Mapping + BFS Pathfinding** |

---

## 🧠 Core Logics & Algorithms

### 1. Smart Route Planner (BFS Pathfinding)
Unlike static maps, Crowd Pulse X uses graph traversal algorithms to calculate the **Fastest Route** or **Least Crowded Route**. 
- **Algorithm**: Breadth-First Search (BFS) combined with weighted graph edges depending on congestion.
- **Dynamic Adjustments**: Live rerouting occurs automatically when crowd density scores at specific nodes spike above safety thresholds.
- **Accessibility Check**: Edge weights are adjusted to prioritize ramps and elevators for wheelchair users.

### 2. Live Match Simulation Engine
Event progression, score updates, and telemetry data are handled by an internal service (`lib/services/matchService.ts`).
- **Telemetry Processing**: Delivers real-time context directly to the dashboard at intervals simulating real-time websockets or live API pulls.
- **Multi-Event Support**: The engine dynamically configures data for different event types (e.g., Cricket at Wankhede, Football at Wembley, Concerts at MSG).

### 3. AETHER AI Assistant Logic
AETHER is the platform’s conversational interface, acting as a tactical stadium dispatcher.
- **Context Awareness**: AETHER's prompts are continuously injected with the current live telemetry data (crowd density, wait times, match scores).
- **Gemini Flash Model**: Uses `gemini-1.5-flash-latest` for low-latency inference, ensuring responses are instant.
- **System Prompt Tuning**: Instructions restrict the AI to brief, 1–3 sentence responses, effectively removing conversational fluff and prioritizing actionable tactical logistics.

---

## 📋 Comprehensive Features

### 🏠 Tactical Dashboard
The command center for your stadium experience:
- **Venue Overview**: Live stats for Narendra Modi Stadium, Wankhede, Wembley, and more.
- **Crowd Score**: A real-time 0-100 meter calculating venue-wide congestion based on regional data aggregations.
- **Smart Recommendations**: AETHER-driven insights on the best gates and shortest food queues.

### 🤖 AETHER — AI Stadium Assistant
Powered by the **Google Gemini API**, AETHER understands natural language and utilizes live venue data to provide personalized guidance.
- *“Which gate is least crowded right now?”*
- *“Find me the fastest food stall near my seat.”*
- *“Show me a wheelchair-friendly route to the exit.”*

### 🗺️ Smart Crowd Heatmap
Interactive tactical maps displaying:
- **Live Status**: Color-coded sections (🟢 Clear, 🟡 Moderate, 🔴 Busy).
- **Amenity Tracking**: Real-time positioning of 🚪 Gates, 🍔 Food, and 🚻 Restrooms.
- **Evacuation Intelligence**: Automated "Safe Exit" routing during emergencies.

---

## 📁 Project Structure

```text
app/
├── api/                    # Backend API routes (e.g., /api/chat)
├── assistant/              # AETHER AI Chat interface
├── menu/                   # Hospitality and local concessions
├── route-planner/          # BFS tactical navigation UI
└── venue/                  # Multi-venue selection & metadata
components/
├── dashboard/              # Tactical HUD and Telemetry
├── maps/                   # SVG Mapping and Route logic
└── ui/                     # shadcn-based design system
lib/
└── services/               # Gemini and Match simulation engines
store/
└── useAppStore.ts          # Global state with LocalStorage persistence
mock-data/
└── venues.ts               # SVG Paths, Section metadata, and initial stats
```

---

## ⚙️ Setup & Connectivity Guidelines

To run this platform efficiently, environment configurations and external connectivity (API keys, databases) must be set up properly via the `.env.local` file.

### 1. Local Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The application is optimized for **Next.js Turbopack** and opens at **http://localhost:3000**

### 2. API Key Configuration (`.env.local`)

To enable the full AETHER experience and connect to backend services, create a `.env.local` file in the root directory:

```env
# ======================================================
# AI ASSISTANT CONNECTIVITY (AETHER)
# ======================================================
# Required: Google Gemini API key for AETHER Chat functions
# Get it from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# ======================================================
# FIREBASE CONNECTIVITY (Database & Auth - If applicable)
# ======================================================
# Use the details provided in your Firebase Project Settings
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Connectivity Troubleshooting
- **Gemini Failing**: Check `api/chat/route.ts` if the API key correctly resolves `process.env.GEMINI_API_KEY`. The platform falls back to an error message if the key is missing.
- **Firebase Connection**: Changes to `NEXT_PUBLIC` variables require a full restart of the development server.

---

## 🎨 Design System

**Crowd Pulse X** features a dark command-center aesthetic:
- **Base**: High-contrast navy (`#0d1117`) with layered glass effects.
- **Accents**: Electric cyan and emerald for "Clear" status pulses.
- **Motion**: Framer Motion orchestration for tactical data entrance.

---

## 🏗️ Assumptions Made

- The platform currently uses mock telemetry and simulated venue data instead of live stadium APIs.
- Crowd density, queue times, and match updates are refreshed through local interval-based simulation.
- BFS pathfinding assumes venue layouts can be represented as graph nodes and connections.
- Internet connectivity is available for AETHER and Gemini API requests.
- Firebase integration is optional and mainly intended for storing telemetry, notifications, and authentication if extended further.
- Only one venue is actively loaded at a time, although the architecture supports multiple venues.
- Accessibility routes assume ramps and elevators are predefined in the venue graph.
- The project is optimized primarily for tablet and desktop dashboard views, with responsive support for mobile devices.

---

## 🌐 Live Demo

Crowd Pulse X is live and accessible here:

https://crowd-pulse-x.vercel.app/

---

## 👨‍💻 Author

Developed by:

**Dhavala V D M Adithya Naidu**
