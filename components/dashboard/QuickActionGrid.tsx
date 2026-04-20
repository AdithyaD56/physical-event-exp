"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Map as MapIcon, ShoppingCart, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";

const ACTIONS = [
  { 
    id: 'a1', 
    label: 'Order Food', 
    sub: 'Skip the queue', 
    icon: ShoppingBag, 
    href: '/menu',
    color: 'bg-orange-500/10 text-orange-500', 
    active: true 
  },
  { 
    id: 'a2', 
    label: 'Arena Map', 
    sub: 'Navigate venue', 
    icon: MapIcon, 
    href: '/route-planner',
    color: 'bg-blue-500/10 text-blue-500', 
    active: true 
  },
  { 
    id: 'a3', 
    label: 'My Cart', 
    sub: 'View orders', 
    icon: ShoppingCart, 
    href: '/cart',
    color: 'bg-green-500/10 text-green-500', 
    active: true 
  },
  { 
    id: 'a4', 
    label: 'Alerts', 
    sub: '4 active now', 
    icon: Bell, 
    href: '/emergency',
    color: 'bg-[#FF4B4B]/10 text-[#FF4B4B]', 
    active: true 
  },
];

export function QuickActionGrid() {
  const cart = useAppStore((state) => state.cart);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF4B4B] flex items-center">
          Quick Actions
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          {ACTIONS.length} options
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ACTIONS.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={action.href}>
              <div className="glass-panel border-white/5 p-6 rounded-[2rem] h-44 flex flex-col justify-between group cursor-pointer hover:bg-white/5 transition-all relative overflow-hidden">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-black text-lg text-white group-hover:text-primary transition-colors">{action.label}</h4>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{action.sub}</p>
                </div>

                {/* Counter for Cart */}
                {action.id === 'a3' && cart.length > 0 && (
                  <div className="absolute top-6 right-6 h-5 w-5 bg-primary text-primary-foreground text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                    {cart.length}
                  </div>
                )}

                {/* Hover arrow */}
                <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
