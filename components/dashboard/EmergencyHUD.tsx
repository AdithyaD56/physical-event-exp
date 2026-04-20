"use client";

import { motion } from "framer-motion";
import { ShieldAlert, MapPin, Phone, Users, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencyHUD() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-0 z-[100] bg-orange-600 shadow-[0_4px_30px_rgba(234,88,12,0.5)]"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] leading-none">Global Security Alert</p>
            <h2 className="text-lg font-black text-white uppercase tracking-tighter">Active Evacuation Sequence</h2>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-white animate-ping"></div>
            <span className="text-xs font-bold text-white uppercase">Nearest Exit: West Gate (140m)</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border border-orange-600 bg-white/20 backdrop-blur-md" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/70">842 fans nearby</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            className="bg-white text-orange-600 hover:bg-white/90 font-black text-[10px] uppercase tracking-widest rounded-full px-6 h-9"
          >
            S.O.S. HELP
          </Button>
        </div>
      </div>
      
      {/* Moving ticker */}
      <div className="bg-black/20 py-1.5 overflow-hidden border-t border-white/10">
        <motion.div 
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex space-x-20"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[9px] font-black text-white/50 uppercase tracking-widest">
              STAY CALM • PROCEED TO NEAREST LIGHTED EXIT • DO NOT USE ELEVATORS • LIVES FIRST • ASSIST OTHERS IF POSSIBLE
            </span>
          ))}
        </motion.div>
      </div>

      {/* Glossy line animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
    </motion.div>
  );
}

export function EvacuationInstructions() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel border-orange-500/30 bg-orange-500/5 rounded-[2.5rem] p-8 space-y-6"
    >
      <div className="flex items-center space-x-3 mb-2">
        <Volume2 className="h-5 w-5 text-orange-500 animate-bounce" />
        <h3 className="font-black text-white uppercase tracking-widest text-sm">Action Sequence</h3>
      </div>

      <div className="space-y-4">
        {[
          { icon: MapPin, title: 'Follow the Red Path', desc: 'Your HUD map is updated with the safest exit route.', color: 'text-orange-500' },
          { icon: Users, title: 'Maintain Order', desc: 'Walk, do not run. Congestion is being monitored.', color: 'text-blue-500' },
          { icon: Phone, title: 'Security Link', desc: 'Tactical assistant is monitoring your biometric pulse.', color: 'text-green-500' },
        ].map((step, i) => (
          <div key={i} className="flex space-x-4 p-4 rounded-3xl bg-white/5 border border-white/5 transition-all hover:bg-white/10">
            <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${step.color}`}>
              <step.icon className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white">{step.title}</h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full bg-white text-black hover:bg-white/90 font-black rounded-2xl h-14 shadow-xl">
        I AM SAFE <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}
