"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Activity, Mic2, Zap, Circle, Users } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { CricketEvent, FootballEvent, CulturalEvent } from "@/types";
import { cn } from "@/lib/utils";

function CricketHUD({ data, venueName }: { data: CricketEvent; venueName: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 px-4">
      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
          <Trophy className="h-3 w-3" />
          <span>Batting</span>
        </div>
        <div>
          <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{data.battingTeam}</h3>
          <p className="text-xs text-muted-foreground font-bold tracking-widest mt-1 opacity-50 uppercase">
            vs {data.bowlingTeam}
          </p>
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] py-8 px-10 inline-block shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Current Score</p>
            <div className="flex items-baseline justify-center space-x-2">
              <span className="text-6xl font-black text-white tabular-nums">{data.runs}</span>
              <span className="text-4xl font-black text-primary tabular-nums">/{data.wickets}</span>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-50">Overs</span>
                <span className="text-sm font-black text-white">{data.overs}</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-50">CRR</span>
                <span className="text-sm font-black text-white">{data.crr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 text-center md:text-right space-y-4">
        <div className="inline-flex items-center space-x-2 bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full border border-orange-500/20 text-[10px] font-black uppercase tracking-widest">
          <Zap className="h-3 w-3" />
          <span>Last Ball</span>
        </div>
        <p className="text-3xl font-black text-white italic">{data.lastBall}</p>
        <div className="flex items-center justify-center md:justify-end space-x-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
          <span>Live from {venueName}</span>
        </div>
      </div>
    </div>
  );
}

function FootballHUD({ data }: { data: FootballEvent }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-12">
      <div className="text-center space-y-4 flex-1">
        <div className="h-20 w-20 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
          <div className="h-12 w-12 bg-blue-600 rounded-lg shadow-lg" />
        </div>
        <div className="space-y-1">
          <p className="font-black text-2xl tracking-tight uppercase">{data.homeTeam}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Home</p>
        </div>
      </div>

      <div className="flex-1 text-center px-8 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full animate-pulse border-2 border-[#0A0A0B]">
          {data.time}&apos;
        </div>
        <div className="bg-[#1A1A1E] border border-white/5 rounded-[2.5rem] py-6 px-10 inline-block shadow-2xl">
          <div className="flex items-center justify-center space-x-6">
            <span className="text-6xl font-black text-white tabular-nums">{data.homeScore}</span>
            <span className="text-3xl font-black opacity-20 italic">VS</span>
            <span className="text-6xl font-black text-white tabular-nums">{data.awayScore}</span>
          </div>
          {data.recentAction && (
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Activity className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{data.recentAction}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-4 flex-1">
        <div className="h-20 w-20 mx-auto rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-xl">
          <div className="h-12 w-12 bg-orange-600 rounded-lg shadow-lg" />
        </div>
        <div className="space-y-1">
          <p className="font-black text-2xl tracking-tight uppercase">{data.awayTeam}</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Away</p>
        </div>
      </div>
    </div>
  );
}

function CulturalHUD({ data }: { data: CulturalEvent }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 px-4">
      <div className="flex-1 text-center md:text-left space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-widest">
          <Mic2 className="h-3 w-3" />
          <span>Active Performance</span>
        </div>
        <div>
          <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.8]">{data.performer}</h3>
          <p className="text-sm text-primary font-bold tracking-[0.2em] mt-3 uppercase italic">{data.stage}</p>
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="h-40 w-40 rounded-full border-[8px] border-white/5 flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-md">
            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Energy Pulse</p>
            <p className="text-5xl font-black text-white">{data.pulseEnergy}%</p>
            <div className="mt-2 w-20 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${data.pulseEnergy}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 text-center md:text-right space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">Now Playing</p>
          <h4 className="text-2xl font-black text-white">{data.currentSong || "LIVE SET"}</h4>
        </div>
        <div className="h-px w-24 bg-white/10 ml-auto hidden md:block" />
        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase opacity-50">Coming Up Next</p>
          <p className="text-sm font-bold text-white/80">{data.nextSong || "INTERMISSION"}</p>
        </div>
      </div>
    </div>
  );
}

export function LiveEventTelemetry() {
  const currentEventType = useAppStore((state) => state.currentEventType);
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const liveTelemetry = selectedVenue?.liveTelemetry;

  if (!selectedVenue) {
    return (
      <div className="h-48 flex items-center justify-center glass-panel rounded-[3rem] border-dashed border-white/10 text-muted-foreground italic">
        Select a venue to sync telemetry...
      </div>
    );
  }

  const defaultCricket: CricketEvent = {
    battingTeam: "MUMBAI INDIANS",
    bowlingTeam: "CHENNAI KINGS",
    runs: 184,
    wickets: 4,
    overs: "18.2",
    crr: "10.04",
    lastBall: "6 RUNS!",
  };

  const defaultFootball: FootballEvent = {
    homeTeam: "MUMBAI CITY",
    awayTeam: "GOA FC",
    homeScore: 2,
    awayScore: 1,
    time: "74",
    status: "LIVE",
    recentAction: "CORNER - HOME",
  };

  const defaultCultural: CulturalEvent = {
    performer: "COLDPLAY",
    stage: "COSMIC MAIN STAGE",
    currentSong: "Yellow",
    nextSong: "Viva La Vida",
    pulseEnergy: 89,
    startTime: "20:00",
  };

  return (
    <div className="glass-panel border-white/5 rounded-[3rem] p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className={cn(
            "absolute top-0 right-0 w-96 h-96 blur-[100px] rounded-full transition-colors duration-1000",
            currentEventType === "cricket"
              ? "bg-blue-600/30"
              : currentEventType === "football"
              ? "bg-green-600/30"
              : "bg-primary/30"
          )}
        />
      </div>

      {/* Decorative scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
        <div className="w-full h-px bg-white/5 absolute top-1/2 -translate-y-1/2 animate-[scan_6s_linear_infinite]" />
      </div>

      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVenue.id + "-" + currentEventType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {currentEventType === "cricket" && (
              <CricketHUD
                data={(liveTelemetry?.data as CricketEvent) || defaultCricket}
                venueName={selectedVenue.name}
              />
            )}
            {currentEventType === "football" && (
              <FootballHUD data={(liveTelemetry?.data as FootballEvent) || defaultFootball} />
            )}
            {currentEventType === "concert" && (
              <CulturalHUD data={(liveTelemetry?.data as CulturalEvent) || defaultCultural} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              {selectedVenue.capacity.toLocaleString()} Capacity
            </span>
          </div>
          <div className="h-4 w-px bg-white/5" />
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Hyper-Sync Active</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-30">
          CrowdPulse-X Telemetry Engine v4.2
        </div>
      </div>
    </div>
  );
}
