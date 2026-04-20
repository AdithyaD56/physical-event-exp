"use client";

import { useState, useEffect } from "react";
import { 
  Navigation2, 
  MapPin, 
  DoorOpen, 
  Toilet, 
  ShoppingBag, 
  ArrowRight, 
  Cloud, 
  Users, 
  MessageSquare,
  Circle,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { StadiumMap } from "@/components/maps/StadiumMap";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function RoutePlannerPage() {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isRouting, setIsRouting] = useState(false);
  const [routeResult, setRouteResult] = useState<{ time: number, distance: string, crowded: boolean } | null>(null);

  const handleClear = () => {
    setFrom("");
    setTo("");
    setRouteResult(null);
    useAppStore.getState().setRoute(null, null);
  };

  const handleRoute = () => {
    if (!from || !to) return;
    setIsRouting(true);
    setRouteResult(null);

    // Find amenity IDs based on input strings (basic mapping for demo)
    const findAmenityId = (input: string) => {
      if (!selectedVenue) return null;
      const normalized = input.toLowerCase();
      const amenity = selectedVenue.layout?.amenities.find(a => 
        a.label?.toLowerCase().includes(normalized) || 
        a.id.toLowerCase().includes(normalized)
      );
      return amenity?.id || null;
    };

    const originId = findAmenityId(from);
    const destId = findAmenityId(to);

    // Mock API call for routing
    setTimeout(() => {
      setIsRouting(false);
      setRouteResult({
        time: Math.floor(Math.random() * 8) + 2,
        distance: "340m",
        crowded: Math.random() > 0.6
      });

      if (originId && destId) {
        useAppStore.getState().setRoute(originId, destId);
      } else {
        // Fallback for demo if IDs aren't found
        useAppStore.getState().setRoute('g-C', 'g-D');
      }
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-white relative flex ${isEmergencyMode ? 'bg-[#1A0A0A]' : ''}`}>
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Top Navigator Header */}
        <header className="px-8 py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0D0D10]/50 backdrop-blur-md sticky top-0 z-20">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="p-2 bg-blue-500/10 rounded-xl">🗺️</span>
              Venue Navigator
            </h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest opacity-60">
              Explore the stadium map, plan routes, and find the best paths
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Live Stats Bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30">
                <Circle className="h-2 w-2 fill-current animate-pulse" />
                LIVE
              </span>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[11px] font-black tracking-tight">48,200 <span className="text-muted-foreground">ATTENDEES</span></span>
              </div>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <div className="flex items-center gap-1.5">
                <Cloud className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[11px] font-black tracking-tight">CLEAR, 24°C</span>
              </div>
            </div>

            <Button className="rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-xs px-6 shadow-lg shadow-blue-500/20">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI
            </Button>
          </div>
        </header>

        {/* 3-Column Content Layout */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 p-8 gap-8">
          
          {/* Middle Column: The BIG Map */}
          <div className="xl:col-span-8 space-y-6">
            <div className="glass-panel border-white/10 rounded-[2.5rem] bg-[#0D0D10] overflow-hidden shadow-2xl min-h-[750px] relative group">
              <div className="w-full h-full">
                <StadiumMap />
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="xl:col-span-4 space-y-8">
            
            {/* Best Right Now Widget */}
            <div className="glass-panel border-white/5 bg-white/2 rounded-[2.5rem] p-8 space-y-6">
              <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest">
                <span className="text-orange-400">⭐</span> Best Right Now
              </h3>
              
              <div className="space-y-4">
                {[
                  { id: 'gate-a', type: 'gate', label: "Fastest Gate", value: "Gate A", sub: "North Entrance", icon: DoorOpen, color: "text-orange-500" },
                  { id: 'restroom-sw', type: 'restroom', label: "Nearest Restroom", value: "Restroom Block SW", sub: "Ground Level", icon: Toilet, color: "text-blue-500" },
                  { id: 'concession-ne', type: 'food', label: "Least Crowded Food", value: "Champion's Grill", sub: "Burgers & Grills", icon: ShoppingBag, color: "text-green-500" },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => useAppStore.getState().setNavTarget(item.id)}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all cursor-pointer hover:border-blue-500/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-tighter">{item.label}</p>
                        <h4 className="text-xs font-black text-white">{item.value}</h4>
                        <p className="text-[9px] text-muted-foreground font-medium">{item.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-black rounded-full border border-green-500/20">
                      <Circle className="h-1.5 w-1.5 fill-current animate-pulse" />
                      1 min
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel border-white/5 bg-white/2 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest">
                  <span className="text-blue-400">📖</span> Route Planner
                </h3>
                {(from || to || routeResult) && (
                  <button 
                    onClick={handleClear}
                    className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">From</p>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Select starting point..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-blue-400/50 transition-all"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">To</p>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Select destination..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-blue-400/50 transition-all"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleRoute}
                  disabled={isRouting || !from || !to}
                  className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/10 group overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {isRouting ? (
                      <motion.span 
                        key="routing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <Circle className="h-4 w-4 mr-2 animate-ping fill-white" />
                        Calculating...
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        Find Best Route
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>

              {/* Route Results Overlay/Content */}
              <AnimatePresence>
                {routeResult && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-6 space-y-4 overflow-hidden"
                  >
                    <div className="h-px bg-white/10 w-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                        <p className="text-[9px] font-black text-blue-400 uppercase mb-1">Estimated Time</p>
                        <p className="text-2xl font-black text-white">{routeResult.time}m</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Total Distance</p>
                        <p className="text-2xl font-black text-white">{routeResult.distance}</p>
                      </div>
                    </div>
                    {routeResult.crowded && (
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3">
                        <span className="text-xl">⚠️</span>
                        <p className="text-[10px] font-bold text-orange-400 leading-tight">
                          Moderate crowd density on main concourse. Rerouting via Sector 4.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Navigate Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest px-1">
                <span className="text-cyan-400">⚡</span> Quick Navigate
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Fastest Exit', type: 'gate' },
                  { label: 'Food Court', type: 'food' },
                  { label: 'Emergency', type: 'gate' },
                  { label: 'Restrooms', type: 'restroom' }
                ].map((item) => (
                  <button 
                    key={item.label} 
                    onClick={() => {
                      const target = selectedVenue?.layout?.amenities
                        .filter(a => a.type === item.type)
                        .sort((a,b) => (a.status === 'clear' ? -1 : 1))[0];
                      if (target) useAppStore.getState().setNavTarget(target.id);
                    }}
                    className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border-dashed hover:border-solid hover:border-cyan-400/50 text-muted-foreground hover:text-cyan-400"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
