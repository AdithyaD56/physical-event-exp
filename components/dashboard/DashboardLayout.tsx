"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cart = useAppStore((state) => state.cart);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-64 relative overflow-y-auto scrollbar-hide">
        {/* Main Content Area */}
        <div className="min-h-full">
          {children}
        </div>

        {/* Floating Cart Hub */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 right-8 z-[60]"
            >
              <Link href="/cart">
                <button className="h-16 px-6 bg-primary text-primary-foreground rounded-2xl flex items-center space-x-4 shadow-[0_10px_40px_-5px_rgba(var(--primary),0.5)] hover:scale-[1.05] active:scale-95 transition-all group border border-white/20">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-3 -right-3 h-6 w-6 bg-white text-primary rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                      {itemCount}
                    </div>
                  </div>
                  <div className="flex flex-col items-start pr-2">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Checkout Hub</span>
                    <span className="text-xs font-bold opacity-80 flex items-center">
                      View Cart <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Global Glass Background for Sidebar feel */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50 pointer-events-none opacity-50" />
      </main>
    </div>
  );
}
