"use client";

import { useAppStore } from "@/store/useAppStore";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import {
  Bot,
  Sparkles,
  Circle,
  Terminal,
  ShieldCheck,
  Zap,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AssistantPage() {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const setPendingQuestion = useAppStore((state) => state.setPendingQuestion);
  const geminiKey = useAppStore((state) => state.geminiKey);
  const setGeminiKey = useAppStore((state) => state.setGeminiKey);

  const SUGGESTED_CHIPS = [
    "Which gate has the shortest line?",
    "Where is the nearest restroom?",
    "What food stall is least crowded?",
    "How crowded is the west stand?",
    "What's the average wait time?",
    "Where can I park tonight?",
    "Find me something to eat near the north stand",
    "Which areas should I avoid?"
  ];

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-white relative flex ${isEmergencyMode ? 'bg-[#1A0A0A]' : ''}`}>
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col h-screen overflow-hidden">

        {/* Top Navigator Header */}
        <header className="px-8 py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0D0D10]/50 backdrop-blur-md z-20">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="p-2 bg-primary/10 rounded-xl">🤖</span>
              AI Assistant
            </h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest opacity-60">
              Your smart event companion powered by local intelligence
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30">
                <Circle className="h-2 w-2 fill-current animate-pulse" />
                LIVE
              </span>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <span className="text-[11px] font-black tracking-tight text-white/50">48,200 <span className="text-muted-foreground">ATTENDEES</span></span>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <span className="text-[11px] font-black tracking-tight text-white/50">CLEAR, 24°C</span>
            </div>
          </div>
        </header>

        {/* AI Page Layout */}
        <div className="flex-1 flex overflow-hidden">

          {/* Left Panel: Context & Sidebar */}
          <aside className="hidden xl:flex w-[350px] border-r border-white/5 flex-col bg-[#0D0D10]/30 overflow-y-auto">
            <div className="flex-1 flex flex-col p-8 space-y-8">
              {/* Bot Profile */}
              <div className="p-6 glass-panel border-primary/20 rounded-[2rem] space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Bot size={80} />
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30 border border-white/10">
                  <Zap className="text-black h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white italic tracking-tighter">Aether AI</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest leading-none">Online</span>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Powered by</p>
                  <div className="flex items-center gap-2 text-pink-500">
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                    <span className="text-[11px] font-black tracking-tight">Local Intelligence</span>
                  </div>
                </div>
              </div>

              {/* Context Info */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Context</p>
                  <h3 className="text-sm font-black text-white">{selectedVenue?.name || "Global Venue Sync"}</h3>
                  <p className="text-xs text-muted-foreground opacity-60">
                    {selectedVenue?.defaultEventType === 'cricket' ? "IPL 2024 Season — Match Phase" : 
                     selectedVenue?.defaultEventType === 'football' ? "Championship Finals — Live Match" : 
                     selectedVenue?.defaultEventType === 'concert' ? "Global Tour — Live Performance" : 
                     "Live Event Operations in Progress"}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Try Asking:</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_CHIPS.slice(0, 8).map((chip, i) => (
                      <button 
                        key={i}
                        onClick={() => setPendingQuestion(chip)}
                        className="text-left p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/50 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20 transition-all flex items-center justify-between group"
                      >
                        {chip}
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto shrink-0">
              <button 
                onClick={() => {
                  const key = prompt("Enter your Gemini API Key to activate high-fidelity reasoning:");
                  if (key) setGeminiKey(key);
                }}
                className={cn(
                  "w-full p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                  geminiKey 
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : "bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
                )}
              >
                <Zap className={cn("h-3.5 w-3.5 fill-current", geminiKey && "text-emerald-400")} />
                {geminiKey ? "Gemini Ultra Active" : "Add Gemini API Key"}
              </button>
            </div>
          </aside>

          {/* Right Panel: Chat Interface */}
          <div className="flex-1 flex flex-col relative bg-[#121216]/20">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
              <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>

            <AssistantChat isFullPage={true} />
          </div>

        </div>
      </main>
    </div>
  );
}
