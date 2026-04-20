"use client";

import { useAppStore } from "@/store/useAppStore";
import { FoodMenu } from "@/components/dashboard/FoodMenu";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
  const isEmergencyMode = useAppStore((state) => state.isEmergencyMode);

  return (
    <div className={`min-h-screen bg-background relative ${isEmergencyMode ? 'bg-[#1A0A0A]' : ''}`}>
      <Sidebar />
      
      <main className="lg:pl-64 pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 space-y-8 pb-32">
          {/* Breadcrumb / Back button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link 
              href="/dashboard"
              className="group flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                <ChevronLeft className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Back to Dashboard</span>
            </Link>
          </motion.div>

          {/* Hero Header */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border border-white/5 p-8 md:p-12 mb-12">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <ShoppingBag className="w-full h-full text-primary rotate-12" />
            </div>
            
            <div className="relative z-10 space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Live Menu Active</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Fuel your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Experience.</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Choose from a curated selection of gourmet meals specifically prepared for this venue. Order now and have it delivered directly to your seat.
              </p>
            </div>
          </div>

          <FoodMenu />
        </div>
      </main>

      {/* Decorative background gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
