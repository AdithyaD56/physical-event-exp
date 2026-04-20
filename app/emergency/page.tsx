"use client";

import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldAlert, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function EmergencyControl() {
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const setEmergencyMode = useAppStore((state) => state.setEmergencyMode);
  const [alertMsg, setAlertMsg] = useState("");

  const handleToggle = (checked: boolean) => {
    setEmergencyMode(checked);
    // In a real app we would fire FCM calls here
  };

  const handleBroadcast = () => {
    if(!alertMsg) return;
    alert(`Broadcasting FCM: ${alertMsg}`);
    setAlertMsg("");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12 relative overflow-hidden">
      {/* High-tech background effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f633,transparent)]"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Command Dashboard
        </Link>
        
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-destructive flex items-center mb-4 tracking-tight neon-glow">
            <ShieldAlert className="h-12 w-12 mr-4 animate-pulse" />
            Mission Control
          </h1>
          <p className="text-lg text-muted-foreground">
            Activate <span className="text-destructive font-bold">Global Emergency Protcols</span> to override stadium flow and push instant FCM alerts.
          </p>
        </div>

        <div className="glass-panel border-destructive/20 rounded-3xl p-6 lg:p-10 space-y-10 shadow-[0_0_50px_-12px_rgba(220,38,38,0.2)]">
          <div className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 ${isEmergencyMode ? 'bg-destructive/10 border-destructive shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-muted/10 border-white/5'}`}>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Stadium Evacuation Override</h3>
              <p className="text-sm text-muted-foreground">Force all navigation to primary and secondary emergency exits.</p>
            </div>
            <Switch 
              checked={isEmergencyMode} 
              onCheckedChange={handleToggle}
              className="scale-125 data-[state=checked]:bg-destructive"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-destructive rounded-full mr-2 animate-ping"></span>
              Broadcast Live Notification
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Enter emergency message (e.g. Exit Gate 3 is blocked)..." 
                value={alertMsg}
                onChange={(e) => setAlertMsg(e.target.value)}
                className="h-14 bg-black/40 border-white/10 rounded-xl focus:ring-destructive focus:border-destructive"
              />
              <Button 
                onClick={handleBroadcast} 
                disabled={!alertMsg} 
                size="lg"
                className="h-14 px-8 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl font-bold shadow-lg shadow-destructive/20"
              >
                <Send className="h-4 w-4 mr-2" /> Broadcast
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mock Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'System status', value: 'Operational', color: 'text-green-400' },
            { label: 'Map overlap', value: '100%', color: 'text-primary' },
            { label: 'Active users', value: '24,102', color: 'text-primary' },
            { label: 'Alert latency', value: '14ms', color: 'text-blue-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</p>
              <p className={`font-mono font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
