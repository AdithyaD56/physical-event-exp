"use client";

import { motion } from "framer-motion";
import { Clock, Info, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventTimeline({ events = [] }: { events?: any[] }) {
  return (
    <Card className="w-full glass-panel border border-white/5 shadow-2xl min-h-[300px]">
      <CardHeader className="py-4 border-b border-white/10">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary neon-glow" />
          <span className="neon-glow">Event Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
        <div className="relative border-l border-border/50 ml-3 space-y-6">
          {events.length > 0 ? events.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative pl-6 ${event.past ? 'opacity-50' : ''}`}
            >
              <div 
                className={`absolute w-3 h-3 rounded-full -left-1.5 top-1.5 border-2 border-background 
                  ${event.current ? 'bg-primary ring-4 ring-primary/20 animate-pulse' : 
                    event.past ? 'bg-muted-foreground' : 'bg-secondary'}`}
              ></div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${event.current ? 'text-primary' : 'text-muted-foreground'}`}>
                  {event.time}
                </span>
                <div className="flex items-start mt-1 space-x-2">
                  {event.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-sm ${event.current ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {event.message}
                  </span>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="pl-6 text-sm text-muted-foreground italic">
              No upcoming events tracked for this venue.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
