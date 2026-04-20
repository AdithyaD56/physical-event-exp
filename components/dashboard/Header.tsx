"use client";

import Link from "next/link";
import { UserCircle, ShieldAlert, ArrowLeft, Navigation2, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header({ venueName }: { venueName: string }) {
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const cart = useAppStore((state) => state.cart);

  return (
    <header className="h-16 shrink-0 px-4 md:px-6 flex items-center justify-between border-b border-white/10 glass-panel z-50">
      <div className="flex items-center space-x-3">
        <Link href="/venue">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg md:text-xl hidden sm:block">CrowdPulse <span className="text-primary neon-glow">AI</span></h1>
        <div className="h-5 w-px bg-border mx-2 hidden sm:block"></div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm px-3 hidden sm:flex">
            {venueName}
          </Badge>
          {isEmergencyMode && (
            <Badge variant="destructive" className="animate-pulse flex items-center">
              <ShieldAlert className="h-3 w-3 mr-1" />
              EMERGENCY
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground mr-2 font-mono flex items-center">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Aether Core v2.0
        </span>

        {/* Ask Aether CTA */}
        <Link href="/assistant">
          <Button
            variant="ghost"
            className="rounded-xl px-4 py-2 h-9 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-sky-500/30 hover:text-cyan-300 transition-all gap-2"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ask Aether
          </Button>
        </Link>

        <Link href="/cart">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-white/10 relative group">
            <ShoppingBag className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] font-black text-primary-foreground rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-primary/20">
                {cart.length}
              </span>
            )}
            <span className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-all bg-black/80 text-[8px] px-2 py-1 rounded border border-white/10 uppercase tracking-widest pointer-events-none">
              Checkout
            </span>
          </Button>
        </Link>
        <Link href="/route-planner">
          <Button variant="ghost" size="icon" className="rounded-full text-primary hover:bg-primary/20 hover:text-primary">
            <Navigation2 className="h-5 w-5" />
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full transition-all ${isEmergencyMode ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-muted-foreground'}`}
          onClick={() => useAppStore.getState().setEmergencyMode(!isEmergencyMode)}
        >
          <ShieldAlert className="h-5 w-5" />
        </Button>
        
        <Sheet>
          <SheetTrigger
            render={
              <button 
                type="button"
                className="h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            }
          >
            <UserCircle className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="glass-panel border-white/5 text-white">
            <SheetHeader>
              <SheetTitle className="text-2xl font-black neon-glow">Personal Dashboard</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Manage your stadium experience and account settings.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-10 space-y-8">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">
                  G
                </div>
                <div>
                  <p className="font-bold">Guest Attendee</p>
                  <p className="text-xs text-muted-foreground">Guest ID: #7721-XP</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <span className="text-sm">Dark Mode</span>
                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <span className="text-sm">Push Notifications</span>
                    <Badge variant="outline" className="text-[10px]">ENABLE</Badge>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-destructive/10 hover:text-destructive transition-colors">
                  Sign Out of Venue
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
