"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function MiniAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hey! I'm Aether — your intelligent event companion. Ask me anything about the venue, match, food, or crowd.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedVenue = useAppStore((s) => s.selectedVenue);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content }]);
    setInput("");
    setIsLoading(true);

    const geminiKey = useAppStore.getState().geminiKey;
    const context = selectedVenue ? {
      venue: selectedVenue.name,
      location: selectedVenue.location,
      type: selectedVenue.defaultEventType,
      telemetry: selectedVenue.liveTelemetry,
      queues: selectedVenue.queues,
      events: selectedVenue.events,
      layout: selectedVenue.layout?.amenities
    } : { note: "General assistance mode — no venue context available" };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: content, 
          context,
          apiKey: geminiKey 
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "r",
          role: "assistant",
          content: (data.result || data.error || "I encountered an issue. Please try again.").replace(/\*\*/g, ''),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "e", role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK = ["Nearest restroom?", "Best food stall?", "Current score?", "Shortest exit?"];

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-black shadow-2xl shadow-cyan-500/40 flex flex-col items-center justify-center gap-0.5 border border-cyan-400/30"
            aria-label="Open Aether AI"
          >
            <Zap className="h-6 w-6 fill-current" />
            <span className="text-[7px] font-black uppercase tracking-widest leading-none">Aether</span>
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] flex flex-col rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
            style={{ background: "rgba(10,12,20,0.96)", backdropFilter: "blur(24px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Zap className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Aether AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400/70">Live Intelligence</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[84%] px-4 py-3 rounded-2xl text-xs leading-relaxed",
                      m.role === "user"
                        ? "bg-gradient-to-br from-cyan-500 to-sky-600 text-black font-bold rounded-tr-sm shadow-lg shadow-cyan-500/20"
                        : "bg-white/8 text-white/90 border border-white/8 rounded-tl-sm"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/8 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Aether thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="px-4 pt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {QUICK.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/40 hover:bg-cyan-500/15 hover:text-cyan-400 hover:border-cyan-500/30 transition-all disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-4 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask Aether anything..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-xs text-white font-medium placeholder:text-white/25 focus:outline-none focus:border-cyan-500/40 transition-all"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 text-black flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
