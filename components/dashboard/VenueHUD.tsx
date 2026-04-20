"use client";

import { useAppStore } from "@/store/useAppStore";
import { MapPin, CheckCircle2, ChevronRight, ShieldAlert, Map, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import Link from "next/link";

export function VenueHUD() {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const user = useAppStore((state) => state.user);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!selectedVenue) return null;

  return (
    <div className="space-y-6 mb-8">
      {/* Dynamic Greeting */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest flex items-center">
            Good {time.getHours() < 12 ? 'morning' : time.getHours() < 18 ? 'afternoon' : 'evening'}, {user.name.split(' ')[0]} 👋
          </p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-4xl font-black tracking-tight text-white leading-tight">CrowdPulse</h2>
            <span className="text-primary font-black italic text-sm">X-Pulse Edition</span>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase opacity-50">
            Real-time Telemetry v4.2 • {format(time, 'hh:mm a')}
          </p>
        </div>
        
        {/* Header right: Switch Venue + Avatar */}
        <div className="flex items-center space-x-3">
          <Link
            href="/venue"
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs font-bold text-muted-foreground hover:text-primary group"
          >
            <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Switch Venue</span>
          </Link>
          <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-1 group cursor-pointer hover:border-primary/50 transition-all shadow-xl">
            <img src={user.avatar} alt="Profile" className="h-full w-full rounded-xl object-cover" />
          </div>
        </div>
      </div>

      {/* Venue Confirmation Bar */}
      <div className={`glass-panel rounded-[2rem] p-5 flex items-center space-x-5 relative overflow-hidden group transition-all duration-700 ${isEmergencyMode ? 'border-orange-500/50 bg-orange-500/10' : 'border-white/5'}`}>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center relative ${isEmergencyMode ? 'bg-orange-500' : 'bg-primary/20'}`}>
          {isEmergencyMode ? <ShieldAlert className="h-5 w-5 text-white" /> : <MapPin className="h-5 w-5 text-primary" />}
          <div className={`absolute inset-0 blur-xl ${isEmergencyMode ? 'bg-orange-500/50' : 'bg-primary/20'}`}></div>
        </div>
        
        <div className="flex-1">
          <div className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest mb-1 ${isEmergencyMode ? 'text-orange-500 animate-pulse' : 'text-green-500'}`}>
            {isEmergencyMode ? <ShieldAlert className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
            <span>{isEmergencyMode ? 'Critical Safety Alert' : 'Venue Confirmed'}</span>
          </div>
          <h3 className="text-xl font-bold text-white transition-colors">{isEmergencyMode ? 'EVACUATE IMMEDIATELY' : selectedVenue.name}</h3>
          <p className="text-xs text-muted-foreground">
            {isEmergencyMode ? 'Proceed to the nearest illuminated exit gate' : `${selectedVenue.location} • ${selectedVenue.capacity.toLocaleString()} Capacity`}
          </p>
        </div>

        <div className="px-4 flex items-center space-x-3">
          <div className={`h-px w-12 ${isEmergencyMode ? 'bg-white/50' : 'bg-white/10'}`} />
          {!isEmergencyMode && (
            <Link
              href="/route-planner"
              className="flex items-center space-x-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors group"
            >
              <Map className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>Open Map</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
          {isEmergencyMode && (
            <span className="text-white text-xs font-bold">ZONE_CLEARANCE active</span>
          )}
        </div>

        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
