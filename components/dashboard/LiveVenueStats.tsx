"use client";

import { motion } from "framer-motion";
import { Coffee, Activity, DoorOpen, Users, Circle } from "lucide-react";

const STATS = [
  { 
    id: 's1', 
    label: 'Concession Wait', 
    value: '~4 min', 
    sub: 'Stand 12 nearest', 
    icon: Coffee, 
    color: 'text-orange-500', 
    trend: 'up' 
  },
  { 
    id: 's2', 
    label: 'Restroom Wait', 
    value: '~2 min', 
    sub: 'Section A west', 
    icon: Activity, 
    color: 'text-blue-500', 
    trend: 'down' 
  },
  { 
    id: 's3', 
    label: 'Gates Busy', 
    value: '3 / 8', 
    sub: 'Gate 5 open', 
    icon: DoorOpen, 
    color: 'text-cyan-400', 
    trend: 'stable' 
  },
  { 
    id: 's4', 
    label: 'Attendance', 
    value: '12,807', 
    sub: 'Cap: 15,000', 
    icon: Users, 
    color: 'text-primary', 
    trend: 'up' 
  },
];

export function LiveVenueStats() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF4B4B] flex items-center">
          <Circle className="h-3 w-3 mr-2 fill-current animate-pulse" /> Live Venue Stats
        </h3>
        <span className="text-[10px] font-mono text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          Real-time
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel border-white/5 p-5 rounded-[1.5rem] space-y-4 group transition-all hover:bg-white/5 hover:-translate-y-1"
          >
            <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-5 w-5" />
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <p className="text-[9px] text-muted-foreground/50 italic">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
