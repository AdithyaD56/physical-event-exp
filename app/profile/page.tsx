"use client";

import { useAppStore } from "@/store/useAppStore";
import { 
  User as UserIcon, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Moon, 
  Sun, 
  Accessibility,
  Trophy,
  Ticket,
  ChevronRight,
  ArrowLeft,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventType } from "@/types";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { TicketDetailModal } from "@/components/modals/TicketDetailModal";
import { TicketVerify } from "@/components/modals/TicketVerify";

export default function ProfilePage() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const accessibilityMode = useAppStore((state) => state.accessibilityMode);
  const toggleAccessibility = useAppStore((state) => state.toggleAccessibility);
  const currentEventType = useAppStore((state) => state.currentEventType);
  const setEventType = useAppStore((state) => state.setEventType);
  const isVerified = useAppStore((state) => state.isVerified);
  const setVerified = useAppStore((state) => state.setVerified);
  const setVenue = useAppStore((state) => state.setVenue);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const router = useRouter();

  const eventTypes: { type: EventType; label: string; icon: string }[] = [
    { type: 'cricket', label: 'Cricket Mode', icon: '🏏' },
    { type: 'football', label: 'Football Mode', icon: '⚽' },
    { type: 'concert', label: 'Concert Mode', icon: '🎸' },
  ];

  const handleLogout = () => {
    setUser({
      id: 'guest-1',
      name: 'Guest Attendee',
      type: 'guest',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
    });
    setVerified(false);
    router.push('/venue');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 space-y-8 pb-32">
      <button 
        onClick={() => router.push('/dashboard')}
        className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Mission Control</span>
      </button>

      <div className="flex items-center space-x-6">
        <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 p-1 group relative overflow-hidden">
          <img src={user.avatar} alt="Profile" className="h-full w-full rounded-2xl object-cover transition-transform group-hover:scale-110" />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white leading-none">{user.name}</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
            {user.type} • ID: {user.id}
          </p>
          {isVerified && (
            <div className="flex items-center space-x-2 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 w-fit mt-2">
              <ShieldCheck className="h-3 w-3" />
              <span>Identity Verified via Ticket</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Account Control</h3>
          <div className="glass-panel border-white/5 rounded-[2rem] overflow-hidden">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Guest to Member</p>
                  <p className="text-[10px] text-muted-foreground">Save preferences & orders</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="h-px w-full bg-white/5" />
            <button 
              onClick={handleLogout}
              className="w-full p-6 flex items-center justify-between hover:bg-[#FF4B4B]/10 transition-all text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-[#FF4B4B]/10 flex items-center justify-center text-[#FF4B4B] group-hover:scale-110 transition-transform">
                  <LogOut className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Reset Session</p>
                  <p className="text-[10px] text-muted-foreground">Log out of current venue</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Intelligence Settings (Developer/Testing) */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Intelligence Engine</h3>
          <div className="glass-panel border-white/5 rounded-[2rem] p-6 space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Simulator Mode</p>
              <div className="grid grid-cols-3 gap-2">
                {eventTypes.map((et) => (
                  <button
                    key={et.type}
                    onClick={() => setEventType(et.type)}
                    className={cn(
                      "p-3 rounded-2xl border transition-all text-center space-y-1",
                      currentEventType === et.type
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                    )}
                  >
                    <div className="text-xl">{et.icon}</div>
                    <p className="text-[8px] font-black uppercase tracking-tighter">{et.label.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Accessibility className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">High Contrast</p>
                  <p className="text-[10px] text-muted-foreground">Accessibility optimization</p>
                </div>
              </div>
              <button 
                onClick={toggleAccessibility}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                  accessibilityMode ? "bg-primary" : "bg-white/10"
                )}
              >
                <div className={cn(
                  "h-4 w-4 rounded-full bg-white shadow-lg transition-all duration-300",
                  accessibilityMode ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Linked Assets */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2">Active Linked Assets</h3>
        {isVerified && user.assignedSeat ? (
          <button 
            onClick={() => setIsTicketModalOpen(true)}
            className="w-full glass-panel bg-primary/5 border-primary/20 p-6 rounded-[2.5rem] flex items-center justify-between group text-left transition-all hover:bg-primary/10"
          >
            <div className="flex items-center space-x-5">
              <div className="h-16 w-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                <Ticket className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white">IPL 2024 Season Ticket</h4>
                <p className="text-xs text-muted-foreground">
                  Wankhede Stadium • <span className="text-primary font-bold">Sec {user.assignedSeat.section}, Row {user.assignedSeat.row}</span>
                </p>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full border border-primary/20 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <ChevronRight className="h-6 w-6 text-primary" />
            </div>
          </button>
        ) : (
          <div className="w-full space-y-4">
            <button 
              onClick={() => setIsVerifyModalOpen(true)}
              className="w-full glass-panel border-white/5 p-8 rounded-[2.5rem] border-dashed flex flex-col items-center justify-center text-center space-y-4 hover:bg-white/5 transition-all group"
            >
              <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:scale-110 shadow-xl transition-transform">
                <Ticket className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Unverified Guest Pass</p>
                <p className="text-[10px] text-muted-foreground max-w-[200px]">Link your digital ticket to unlock real-time tactical overlays and in-seat telemetry.</p>
              </div>
            </button>
            <button 
              onClick={() => setVerified(true, { section: 'A14', row: '3', seat: '9' })}
              className="w-full p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              One-Click Demo Login (FAST TRACK)
            </button>
          </div>
        )}
      </section>

      <TicketDetailModal 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)} 
      />

      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setIsVerifyModalOpen(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <TicketVerify />
          </div>
        </div>
      )}
    </div>
  );
}
