"use client";

import { useAppStore } from "@/store/useAppStore";
import { Ticket, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VerifiedSeatWidget() {
  const isVerified = useAppStore((state) => state.isVerified);
  const user = useAppStore((state) => state.user);
  const setVerified = useAppStore((state) => state.setVerified);

  if (!isVerified || !user.assignedSeat) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass-panel bg-green-500/10 border-green-500/20 rounded-2xl p-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <Ticket className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest leading-none mb-1">Authenticated Session</p>
          <p className="text-sm font-black text-white">
            Verified Seat: <span className="text-primary uppercase tracking-tighter ml-1">
              Section {user.assignedSeat.section}, Row {user.assignedSeat.row}
            </span>
          </p>
        </div>
      </div>

      <button 
        onClick={() => setVerified(false)}
        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] font-bold rounded-xl transition-all border border-white/5"
      >
        Remove
      </button>
    </motion.div>
  );
}
