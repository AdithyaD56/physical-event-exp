"use client";

import { useAppStore } from "@/store/useAppStore";
import { VenueHUD } from "@/components/dashboard/VenueHUD";
import { LiveEventTelemetry } from "@/components/dashboard/LiveEventTelemetry";
import { QuickActionGrid } from "@/components/dashboard/QuickActionGrid";
import { LiveVenueStats } from "@/components/dashboard/LiveVenueStats";
import { AnnouncementsBox } from "@/components/dashboard/AnnouncementsBox";
import { VerifiedSeatWidget } from "@/components/dashboard/VerifiedSeatWidget";
import { TicketVerify } from "@/components/modals/TicketVerify";
import { AssistantChat } from "@/components/assistant/AssistantChat";
import { EmergencyHUD, EvacuationInstructions } from "@/components/dashboard/EmergencyHUD";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);

  return (
    <div className={`min-h-full w-full relative transition-colors duration-1000 ${isEmergencyMode ? 'bg-[#1A0A0A]' : ''}`}>
      <TicketVerify />
      <AnimatePresence>
        {isEmergencyMode && <EmergencyHUD />}
      </AnimatePresence>
      
      <div className={`max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12 space-y-8 pb-32 transition-all duration-700 ${isEmergencyMode ? 'pt-24' : ''}`}>
        {/* Top Intelligence HUD */}
        <VenueHUD />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Content (Left - 7/12 or 8/12) */}
          <div className="xl:col-span-8 space-y-8">
            {!isEmergencyMode ? (
              <>
                <LiveEventTelemetry />
                <VerifiedSeatWidget />
                <AnnouncementsBox />
              </>
            ) : (
              <div className="space-y-8">
                <div className="glass-panel border-orange-500/20 p-8 rounded-[2.5rem] bg-orange-500/5">
                  <h2 className="text-3xl font-black text-white mb-4 flex items-center">
                    <ShieldAlert className="h-8 w-8 text-orange-500 mr-4" />
                    EVACUATION ROUTE ACTIVE
                  </h2>
                  <p className="text-muted-foreground text-sm max-w-2xl">
                    Follow the highlighted neon paths on your tactical map. Security personnel are stationed at every intersection to assist with the transition.
                  </p>
                </div>
                {/* We will show a special evacuation map view here later */}
                <AnnouncementsBox />
              </div>
            )}
          </div>

          {/* Sidebar Insights (Right - 4/12) */}
          <div className="xl:col-span-4 space-y-8">
            {!isEmergencyMode ? (
              <>
                <QuickActionGrid />
                <LiveVenueStats />
              </>
            ) : (
              <EvacuationInstructions />
            )}
          </div>
        </div>
      </div>

      <AssistantChat />
      
      {/* Background Ambience Animations */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full animate-pulse transition-colors duration-1000 ${isEmergencyMode ? 'bg-orange-600/30' : 'bg-primary/20'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blur-[100px] rounded-full animate-pulse delay-700 transition-colors duration-1000 ${isEmergencyMode ? 'bg-red-600/30' : 'bg-blue-500/20'}`} />
      </div>
    </div>
  );
}

