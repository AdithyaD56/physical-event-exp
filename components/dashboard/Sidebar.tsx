"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ShoppingBag, 
  Map as MapIcon, 
  ShoppingCart, 
  User as UserIcon, 
  Bell, 
  Menu,
  X,
  ShieldAlert,
  Building2,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Venues", icon: Building2, href: "/venue" },
  { label: "Order", icon: ShoppingBag, href: "/menu" },
  { label: "Map", icon: MapIcon, href: "/route-planner" },
  { label: "AI Assistant", icon: Bot, href: "/assistant" },
  { label: "Cart", icon: ShoppingCart, href: "/cart" },
  { label: "Profile", icon: UserIcon, href: "/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);
  const setEmergencyMode = useAppStore((state) => state.setEmergencyMode);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-background/80 backdrop-blur-md rounded-xl border border-white/10"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-white/5 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center text-2xl group transition-transform hover:rotate-12 cursor-pointer">
              🏟️
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight leading-none">CrowdPulse</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">X-Pulse Edition</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} />
                  <span className="font-bold text-sm">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
            <div className="pt-8 space-y-2">
              <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4 mb-2">Systems</h3>
              <button 
                onClick={() => setEmergencyMode(!isEmergencyMode)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isEmergencyMode 
                    ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                <ShieldAlert className={cn(
                  "h-5 w-5 transition-transform",
                  isEmergencyMode ? "animate-pulse" : "group-hover:rotate-12"
                )} />
                <span className="font-bold text-sm">Safety Override</span>
                {isEmergencyMode && (
                  <div className="absolute inset-0 bg-white/20 animate-[ping_2s_infinite]" />
                )}
              </button>
            </div>
          </nav>

          {/* User Footer */}
          <div className="pt-6 border-t border-white/5">
            <Link 
              href="/profile"
              className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 group-hover:border-primary/50 transition-colors">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{user.type}</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        />
      )}
    </>
  );
}
