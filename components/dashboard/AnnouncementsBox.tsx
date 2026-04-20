"use client";

import { motion } from "framer-motion";
import { Megaphone, AlertTriangle, Trophy, Coffee, Car } from "lucide-react";

const ANNOUNCEMENTS = [
  {
    id: 'n1',
    message: 'Gate 3 is crowded — use Gate 5 for faster entry.',
    icon: AlertTriangle,
    color: 'text-[#FF4B4B] bg-[#FF4B4B]/10',
    time: '2m ago'
  },
  {
    id: 'n2',
    message: 'Goal! Mumbai City FC scores in the 71st minute!',
    icon: Trophy,
    color: 'text-primary bg-primary/10',
    time: '5m ago'
  },
  {
    id: 'n3',
    message: 'Express pickup live at Stand 7 — 0 min wait.',
    icon: Coffee,
    color: 'text-orange-500 bg-orange-500/10',
    time: '8m ago'
  },
  {
    id: 'n4',
    message: 'Parking Zone B has available spots.',
    icon: Car,
    color: 'text-blue-500 bg-blue-500/10',
    time: '12m ago'
  }
];

export function AnnouncementsBox() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 px-1">
        <Megaphone className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Announcements</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ANNOUNCEMENTS.map((note, idx) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel border-white/5 p-4 rounded-2xl flex items-center space-x-4 group hover:bg-white/5 transition-all cursor-pointer"
          >
            <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${note.color}`}>
              <note.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                {note.message}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">{note.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
