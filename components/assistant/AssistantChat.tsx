"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AssistantChatProps {
  isFullPage?: boolean;
}

export function AssistantChat({ isFullPage = false }: AssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'assistant', content: "Greetings! I'm Aether — your intelligent event companion. Ask me anything about the venue, live match stats, or how to navigate the crowd." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const pendingQuestion = useAppStore((state) => state.pendingQuestion);
  const setPendingQuestion = useAppStore((state) => state.setPendingQuestion);
  const geminiKey = useAppStore((state) => state.geminiKey);

  const QUICK_PROMPTS = [
    "Find nearest restroom",
    "Shortest food queue",
    "Where is the nearest exit?",
    "Show me today's lineup"
  ];

  // Watch for questions triggered from the landing page
  useEffect(() => {
    if (pendingQuestion && !isLoading) {
      handleSend(pendingQuestion);
      setPendingQuestion(null);
    }
  }, [pendingQuestion, isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const generateResponse = (query: string) => {
    const q = query.toLowerCase();
    const venueName = selectedVenue?.name || "the stadium";

    if (q.includes("gate") || q.includes("shortest line") || q.includes("line")) {
      return `Monitoring all checkpoints at ${venueName}. Gate B (North-East) currently has the lowest density with a ~2 minute transition time. Gate A is congested (~12 min). I recommend heading to Gate B.`;
    }
    if (q.includes("restroom") || q.includes("toilet") || q.includes("washroom")) {
      const stand = q.includes("west") ? "West Stand" : q.includes("east") ? "East Stand" : "Stand A";
      return `The nearest restroom to your current sector is behind ${stand}, Section 4. It's currently at low capacity (Clear status).`;
    }
    if (q.includes("food") || q.includes("eat") || q.includes("stall") || q.includes("crowded")) {
      if (q.includes("least crowded") || q.includes("shortest queue")) {
        return `Current analysis shows 'Vada Pav Corner' (near Section 12) has the shortest queue at 4 minutes. Most other stalls are averaging 15+ minutes right now.`;
      }
      if (q.includes("north stand")) {
        return `Near the North Stand, you'll find 'The Burger Hub' and 'Masala Express'. Both are moderately crowded. 'The Burger Hub' currently has a slightly faster service time.`;
      }
      return `I've mapped several options near you. Vada Pav Corner and Pizza Hub nearby have under 5-minute wait times. Which would you prefer?`;
    }
    if (q.includes("wait time") || q.includes("average")) {
      return `Across all internal facilities at ${venueName}, the average wait time is currently 8.5 minutes. Amenities near the Main Gate are slightly higher at 14 minutes.`;
    }
    if (q.includes("park") || q.includes("parking")) {
      return `Main Parking (Lot A) is currently at 95% capacity. I recommend the Satellite Lot (Zone 4) which is still at 40% and has a 5-minute shuttle to the main gate.`;
    }
    if (q.includes("match") || q.includes("end") || q.includes("time") || q.includes("schedule")) {
      const type = selectedVenue?.defaultEventType?.toLowerCase() || 'match';
      if (q.includes("end") || q.includes("finish")) {
        return `Current projections for this ${type} indicate a conclusion around 10:45 PM. However, this may shift depending on play intensity and any unforeseen pauses. I'll keep you updated!`;
      }
      if (q.includes("start") || q.includes("begin")) {
        return `Ground operations are synchronized for a 7:00 PM kick-off (or first ball). Gates are currently open for all verified attendees.`;
      }
    }
    return `Aether here! I'm monitoring ${venueName} for you. I can help with real-time stats, facilities, or tactical navigation. What's on your mind?`;
  };

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

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
          apiKey: geminiKey // Pass local key if provided via UI
        }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { id: Date.now().toString() + 'r', role: 'assistant', content: data.result.replace(/\*\*/g, '') }]);
      } else {
        // Fallback to local intelligence if API is not configured but user has no key
        const fallbackText = generateResponse(content).replace(/\*\*/g, '');
        setMessages((prev) => [...prev, { id: Date.now().toString() + 'f', role: 'assistant', content: fallbackText }]);
      }
    } catch (err) {
      // Final fallback
      const errorText = generateResponse(content).replace(/\*\*/g, '');
      setMessages((prev) => [...prev, { id: Date.now().toString() + 'e', role: 'assistant', content: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatContent = (
    <div className={cn(
      "flex flex-col overflow-hidden",
      isFullPage ? "h-full w-full" : "fixed bottom-6 right-6 z-50 w-[380px] h-[580px] glass-panel border border-white/10 rounded-[2rem] shadow-2xl"
    )}>
      {/* Header */}
      {!isFullPage && (
        <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Aether AI</h3>
              <div className="flex items-center gap-4">
                {geminiKey && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Gemini Ultra Enhanced</span>
                  </div>
                )}
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Pulse</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Messages area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={cn(
                "flex",
                m.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed",
                m.role === 'user' 
                  ? "bg-primary text-white font-bold rounded-tr-md shadow-lg shadow-primary/20" 
                  : "bg-white/10 text-white/90 border border-white/5 rounded-tl-md backdrop-blur-md"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 p-4 rounded-3xl rounded-tl-md border border-white/5 flex items-center gap-3">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 bg-white/5 border-t border-white/5 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSend(qp)}
              disabled={isLoading}
              className="whitespace-nowrap px-4 py-2 bg-white/5 border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your message..." 
            className="h-14 rounded-2xl bg-white/5 border-white/10 px-6 text-sm font-medium focus-visible:ring-primary/50 transition-all"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-2xl shrink-0 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95" 
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (isFullPage) {
    return chatContent;
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              size="icon" 
              className="h-16 w-16 rounded-[1.5rem] shadow-2xl bg-primary hover:bg-primary/90 hover:scale-110 transition-all duration-300 group border border-white/20"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare className="h-7 w-7 text-white group-hover:rotate-12 transition-all neon-glow" />
              <div className="absolute inset-0 rounded-[1.5rem] bg-primary/20 animate-ping -z-10"></div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 right-0 z-50 p-6 pointer-events-none"
          >
            <div className="pointer-events-auto">
              {chatContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
