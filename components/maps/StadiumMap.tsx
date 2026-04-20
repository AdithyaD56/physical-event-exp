"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ShoppingBag,
  Circle,
  DoorOpen,
  Toilet,
  Car,
  Navigation2,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All", icon: MapPin },
  { id: "gate", label: "Gates", icon: DoorOpen },
  { id: "food", label: "Food", icon: ShoppingBag },
  { id: "restroom", label: "Restrooms", icon: Toilet },
  { id: "parking", label: "Parking", icon: Car },
];

const STATUS_COLORS = {
  clear: { dot: "#22c55e", bg: "bg-green-500/10 text-green-400", border: "stroke-green-500" },
  moderate: { dot: "#f59e0b", bg: "bg-amber-500/10 text-amber-400", border: "stroke-amber-500" },
  busy: { dot: "#ef4444", bg: "bg-red-500/10 text-red-400", border: "stroke-red-500" },
};

const AMENITY_EMOJIS: Record<string, string> = {
  gate: "🚪",
  food: "🍔",
  restroom: "🚻",
  parking: "🅿️",
};

export function StadiumMap({ route }: { route?: string }) {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isVerified = useAppStore((state) => state.isVerified);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const activeNavTargetId = useAppStore((state) => state.activeNavTargetId);
  const routeOriginId = useAppStore((state) => state.routeOriginId);
  const routeDestinationId = useAppStore((state) => state.routeDestinationId);
  const setNavTarget = useAppStore((state) => state.setNavTarget);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Fix hydration mismatch by only rendering dynamic random data after mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!selectedVenue || !selectedVenue.layout) {
    return (
      <div className="h-[70vh] glass-panel rounded-3xl flex items-center justify-center border-dashed border-white/10">
        <p className="text-muted-foreground">Select a venue to load the map...</p>
      </div>
    );
  }

  const { layout } = selectedVenue;
  const filteredAmenities = layout.amenities.filter(
    (a) => activeFilter === "all" || a.type === activeFilter
  );

  // Dynamic Nearest Gate Logic for Emergency Mode
  const userPos = { x: 120, y: 120 }; // Fixed user seat coordinate
  const nearestGate = layout.amenities
    .filter((a) => a.type === "gate")
    .map((gate) => ({
      ...gate,
      dist: Math.sqrt(Math.pow(gate.x - userPos.x, 2) + Math.pow(gate.y - userPos.y, 2)),
    }))
    .sort((a, b) => a.dist - b.dist)[0];

  const emergencyPath = nearestGate 
    ? `M ${userPos.x} ${userPos.y} L ${nearestGate.x} ${nearestGate.y}`
    : "M 120 120 L 100 80 L 50 30";

  // Tactical navigation path to active target
  const activeNavTarget = layout.amenities.find(a => a.id === activeNavTargetId);
  const navPath = activeNavTarget 
    ? `M ${userPos.x} ${userPos.y} L ${activeNavTarget.x} ${activeNavTarget.y}`
    : null;

  // Custom A-to-B route path
  const routeOrigin = layout.amenities.find(a => a.id === routeOriginId);
  const routeDestination = layout.amenities.find(a => a.id === routeDestinationId);
  const routePath = (routeOrigin && routeDestination)
    ? `M ${routeOrigin.x} ${routeOrigin.y} L ${routeDestination.x} ${routeDestination.y}`
    : null;

  const pitchLabel =
    isEmergencyMode
      ? "EVACUATE"
      : layout.pitch.type === "oval"
      ? "CRICKET"
      : selectedVenue.defaultEventType === "concert"
      ? "STAGE"
      : "FOOTBALL";

  const pitchColor =
    selectedVenue.defaultEventType === "concert"
      ? { fill: "fill-cyan-500/10", stroke: "stroke-cyan-400/30", r: 0 }
      : { fill: "fill-emerald-600/20", stroke: "stroke-emerald-400/40", r: 4 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-2">
            🏟️ {selectedVenue.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time tactical venue intelligence active
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest bg-white/5 py-2 px-6 rounded-full border border-white/10 backdrop-blur-md shadow-xl">
          {(["clear", "moderate", "busy"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ 
                  background: STATUS_COLORS[s].dot,
                  boxShadow: `0 0 10px ${STATUS_COLORS[s].dot}66`
                }}
              />
              <span className="text-white font-bold opacity-80 capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex overflow-x-auto pb-1 gap-2 scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cn(
              "flex items-center gap-1.5 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap text-xs font-black uppercase tracking-[0.1em]",
              activeFilter === f.id
                ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
            )}
          >
            <f.icon className="h-4 w-4" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Verification bar */}
      <AnimatePresence>
        {isVerified && (
          <motion.div
            key="verification-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl px-6 py-4 flex items-center gap-3"
          >
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
            <p className="text-base text-white/90">
              Biometric Check Verified. Your current seat is in <strong className="text-emerald-400 font-black">STAND A, BLOCK 4</strong>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map + Sidebar grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ minHeight: "80vh" }}>
        {/* ─── SVG MAP ─── */}
        <div
          className={cn(
            "lg:col-span-8 rounded-[3rem] border relative overflow-hidden group shadow-2xl",
            isEmergencyMode
              ? "bg-red-950/40 border-red-500/30 ring-4 ring-red-500/10"
              : "bg-[#0d1117] border-white/8"
          )}
        >
          {/* Bigger Map Indicator overlay */}
          <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-opacity opacity-0 group-hover:opacity-100 uppercase text-[10px] font-black tracking-widest text-white/40 pointer-events-none">
            Scale: 1:500 Tactical View
          </div>

          <svg viewBox={layout.viewBox} className="w-full h-full p-0">
            <defs>
              <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Stands */}
            {layout.stands.map((stand) => (
              <path
                key={stand.id}
                d={stand.path}
                fill="url(#standGrad)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                className="hover:fill-cyan-500/10 hover:stroke-cyan-400/50 transition-all duration-300 cursor-pointer"
              >
                <title>{stand.label}</title>
              </path>
            ))}

            {/* Pitch / Playing surface */}
            <g className="pitch-container">
              <path
                d={layout.pitch.d}
                className={cn(pitchColor.fill, pitchColor.stroke, "stroke-[3]")}
                style={{ filter: "drop-shadow(0 0 30px rgba(16,185,129,0.1))" }}
              />
              {selectedVenue.defaultEventType === 'cricket' && (
                <>
                  {/* Boundary Line */}
                  <path
                    d={layout.pitch.d}
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Inner Circle (typical for cricket) */}
                  <ellipse 
                    cx="400" cy="300" rx="90" ry="70" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="1" 
                  />
                </>
              )}
            </g>

            {/* Stand Labels - Improved placement and readability */}
            {layout.stands.map((stand) => {
              let lx: number;
              let ly: number;
              let rotate = 0;
              
              // Handle standard and custom stand directions for label placement
              if (stand.id.includes('north') || stand.id.includes('gujarat') || stand.id.includes('great-southern')) { lx = 400; ly = 65; }
              else if (stand.id.includes('south') || stand.id.includes('adani') || stand.id.includes('ponsford') || stand.id.includes('floor')) { lx = 400; ly = 545; }
              else if (stand.id.includes('east') || stand.id.includes('reliance') || stand.id.includes('tendulkar') || stand.id.includes('olympic') || stand.id.includes('lateral-2')) { lx = 730; ly = 300; rotate = -90; }
              else if (stand.id.includes('west') || stand.id.includes('nita') || stand.id.includes('garware') || stand.id.includes('members') || stand.id.includes('lateral-1')) { lx = 70; ly = 300; rotate = -90; }
              else return null;

              return (
                <text
                  key={`label-${stand.id}`}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none fill-white/20 text-[9px] font-black uppercase tracking-[0.3em]"
                  transform={rotate ? `rotate(${rotate}, ${lx}, ${ly})` : ""}
                >
                  {stand.label}
                </text>
              );
            })}

            {/* Pitch label - Integrated into the tactical overlay */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none"
              fill={isEmergencyMode ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}
              fontSize="32"
              fontWeight="900"
              letterSpacing="16"
              style={{ filter: "blur(0.5px)" }}
            >
              {pitchLabel}
            </text>

            {/* Navigation route */}
            <AnimatePresence>
              {navPath && !isEmergencyMode && (
                <g key="nav-path-layer">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={navPath}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                    style={{ filter: "drop-shadow(0 0 15px #22d3ee)" }}
                  />
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    cx={activeNavTarget?.x}
                    cy={activeNavTarget?.y}
                    r="30"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    className="animate-ping opacity-40"
                  />
                </g>
              )}

              {routePath && !isEmergencyMode && (
                <g key="route-path-layer">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    d={routePath}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="15 5"
                    style={{ filter: "drop-shadow(0 0 20px #6366f1)" }}
                  />
                  {/* Origin Indicator */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    cx={routeOrigin?.x}
                    cy={routeOrigin?.y}
                    r="35"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    className="animate-pulse opacity-30"
                  />
                  {/* Destination Indicator */}
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    cx={routeDestination?.x}
                    cy={routeDestination?.y}
                    r="40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    className="animate-ping opacity-40"
                  />
                </g>
              )}
              {isEmergencyMode && isVerified && (
                <motion.path
                  key="emergency-path-layer"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.2 }}
                  d={emergencyPath}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="20, 20"
                  style={{ filter: "drop-shadow(0 0 20px #ef4444)" }}
                />
              )}
            </AnimatePresence>

            {/* Amenity markers */}
            {filteredAmenities.map((amenity) => {
              const sc = isEmergencyMode ? STATUS_COLORS.busy : STATUS_COLORS[amenity.status];
              const isHovered = hoveredAmenity === amenity.id;
              const isNearestExit = isEmergencyMode && amenity.id === nearestGate?.id;

              return (
                <g
                  key={amenity.id}
                  className="cursor-pointer group/marker"
                  onMouseEnter={() => setHoveredAmenity(amenity.id)}
                  onMouseLeave={() => setHoveredAmenity(null)}
                  onClick={() => setNavTarget(amenity.id === activeNavTargetId ? null : amenity.id)}
                >
                  {/* Highlight for nearest exit */}
                  {isNearestExit && (
                    <circle
                      cx={amenity.x}
                      cy={amenity.y}
                      r="35"
                      className="fill-red-500/20 animate-ping"
                    />
                  )}

                  {/* Marker Body */}
                  <circle
                    cx={amenity.x}
                    cy={amenity.y}
                    r={isHovered ? 26 : 22}
                    fill="rgba(0,0,0,0.85)"
                    stroke={sc.dot}
                    strokeWidth={isHovered ? 4 : 2}
                    style={{ 
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", 
                      filter: (isHovered || isNearestExit) ? `drop-shadow(0 0 12px ${sc.dot})` : undefined 
                    }}
                  />
                  {/* Icon */}
                  <text
                    x={amenity.x}
                    y={amenity.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isHovered ? "14" : "12"}
                    className="pointer-events-none select-none"
                  >
                    {AMENITY_EMOJIS[amenity.type]}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && hasMounted && (
                    <foreignObject
                      x={amenity.x - 70}
                      y={amenity.y - 100}
                      width="140"
                      height="85"
                      className="pointer-events-none"
                    >
                      <div className="bg-[#0b0e14] border-2 border-cyan-500/30 rounded-2xl p-3 text-center shadow-2xl backdrop-blur-xl ring-1 ring-black/50">
                        <p className="text-[11px] font-black text-white leading-tight uppercase tracking-wide">
                          {amenity.label}
                        </p>
                        <div
                          className="text-[10px] font-black mt-2 px-2.5 py-0.5 rounded-full inline-block"
                          style={{ background: `${sc.dot}22`, color: sc.dot, border: `1px solid ${sc.dot}44` }}
                        >
                          {isEmergencyMode ? "PRIMARY EXIT" : amenity.status.toUpperCase()}
                        </div>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                          <Navigation2 className="h-2.5 w-2.5 text-cyan-400" />
                          <span className="text-[9px] text-cyan-300 font-black">
                            {Math.floor(amenity.id.length * 0.7)} MIN WALK
                          </span>
                        </div>
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* User location dot */}
            {isVerified && (
              <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                <circle cx={userPos.x} cy={userPos.y} r="8" fill="#22d3ee" className="shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                <circle cx={userPos.x} cy={userPos.y} r="20" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.4" className="animate-pulse" />
                
                {/* Pointer handle to show direction or just 'YOU' */}
                <rect x={userPos.x - 20} y={userPos.y + 25} width="40" height="18" rx="9" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1" />
                <text x={userPos.x} y={userPos.y + 38} textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="900" className="tracking-widest uppercase">YOU</text>
              </motion.g>
            )}
          </svg>
        </div>

        {/* ─── SIDEBAR ─── */}
        <div className="lg:col-span-4 bg-[#0d1117]/80 backdrop-blur-xl border border-white/8 rounded-[3rem] flex flex-col p-6 gap-6 shadow-2xl">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-40">
              Tactical Facilities
            </h3>
            <span className="text-[10px] font-mono text-cyan-400/60 font-black">
              LIVE BROADCAST
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-1">
            {filteredAmenities.map((amenity) => {
              const sc = STATUS_COLORS[amenity.status];
              // Fixed wait time for hydration
              const stableWait = amenity.id.length + 3; 
              
              return (
                <div
                  key={amenity.id}
                  className={cn(
                    "p-4 rounded-3xl transition-all cursor-pointer group border",
                    activeNavTargetId === amenity.id 
                      ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                      : "bg-white/3 border-white/5 hover:bg-white/6 hover:border-white/10"
                  )}
                  onMouseEnter={() => setHoveredAmenity(amenity.id)}
                  onMouseLeave={() => setHoveredAmenity(null)}
                  onClick={() => setNavTarget(amenity.id === activeNavTargetId ? null : amenity.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-inner">
                      {AMENITY_EMOJIS[amenity.type]}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors">
                        {amenity.label}
                      </h4>
                      <p className="text-[10px] text-muted-foreground font-black uppercase mt-1 tracking-tight">
                        WAIT: ~{hasMounted ? `${stableWait}m` : '--'}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase shrink-0 border",
                      sc.bg,
                      `border-${sc.dot.replace('#', '')}44`
                    )}
                  >
                    <Circle className="h-2 w-2 fill-current shadow-[0_0_8px_currentColor]" />
                    {amenity.status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Directions CTA */}
          <button 
            onClick={() => {
              if (hoveredAmenity) {
                setNavTarget(hoveredAmenity);
              } else if (activeNavTargetId) {
                setNavTarget(null);
              }
            }}
            className={cn(
              "w-full py-5 text-black font-black text-sm rounded-3xl flex items-center justify-center gap-3 transition-all hover:scale-[1.03] shadow-2xl group active:scale-95",
              activeNavTargetId 
                ? "bg-white/10 text-white border border-white/20" 
                : "bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/40"
            )}
          >
            {activeNavTargetId ? (
              <>
                <X className="h-5 w-5" />
                CLEAR NAVIGATION
              </>
            ) : (
              <>
                <Navigation2 className="h-5 w-5 fill-current group-hover:animate-bounce" />
                GET DIRECTIONS
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
