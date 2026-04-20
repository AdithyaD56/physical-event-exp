"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Cpu, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { TicketVerify } from "@/components/modals/TicketVerify";

export default function Home() {
  const router = useRouter();
  const isVerified = useAppStore((state) => state.isVerified);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [postVerifyRoute, setPostVerifyRoute] = useState<string | null>(null);

  const handleEntry = (route: string) => {
    if (isVerified) {
      router.push(route);
    } else {
      setPostVerifyRoute(route);
      setIsVerifyModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden relative">
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
 
      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">
            🏟️
          </div>
          <h1 className="text-2xl font-black tracking-tighter">CrowdPulse <span className="text-primary italic">X</span></h1>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest text-white/50">
          <a href="#technology" className="hover:text-primary transition-colors">Technology</a>
          <a href="#stadiums" className="hover:text-primary transition-colors">Stadiums</a>
          <button 
            onClick={() => handleEntry('/dashboard')}
            className="text-white hover:text-primary transition-colors uppercase tracking-widest text-[10px] font-bold"
          >
            Dashboard
          </button>
        </div>
        <button 
          onClick={() => handleEntry('/profile')}
          className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest px-8 py-3 transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        <motion.div
  initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <Zap className="h-3 w-3" />
            <span>Next-Gen Stadium Intelligence</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto">
            THE PULSE OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">LIVE SPECTACLE.</span>
          </h1>

          <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
            Eliminate friction. Predict crowd dynamics. Navigate like an insider. <br className="hidden md:block" />
            The definitive operating system for large-scale venues.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              onClick={() => handleEntry('/dashboard')}
              className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm tracking-widest group shadow-2xl shadow-primary/30"
            >
              EXPLORE AS GUEST <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => handleEntry('/profile')}
              variant="outline" 
              className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-sm tracking-widest"
            >
              VERIFY TICKET
            </Button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          id="technology"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full"
        >
          {[
            { 
              title: "Predictive Flow", 
              desc: "Deep learning models predict queue times before you arrive.", 
              icon: Cpu, 
              color: "text-cyan-500" 
            },
            { 
              title: "Tactical Core", 
              desc: "In-seat delivery and smart maps unlocked via secure ticket verification.", 
              icon: ShieldCheck, 
              color: "text-amber-500" 
            },
            { 
              title: "Aether AI", 
              desc: "Integrated intelligence active across world-class sports arenas.", 
              icon: Globe, 
              color: "text-primary" 
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel border-white/5 p-8 rounded-[2.5rem] text-left group hover:bg-white/5 transition-all">
              <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-black text-xl mb-2 text-white">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Stadiums Section */}
        <motion.section
          id="stadiums"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 w-full space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">GLOBAL DEPLOYMENTS.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real-time intelligence active across world-class sports arenas and concert venues.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Wankhede", img: "/venues/Wankhede_Stadium_(86312941).jpeg" },
              { name: "Wembley", img: "/venues/London_Wembley.jpg" },
              { name: "MSG", img: "/venues/msg.png" },
              { name: "Camp Nou", img: "/venues/camp-nou.png" },
              { name: "MCG", img: "/venues/mcg.png" },
              { name: "N. Modi", img: "/venues/Narendra_Modi_Stadium.jpg" }
            ].map((venue, i) => (
              <div key={i} className="group relative h-40 rounded-2xl overflow-hidden border border-white/5">
                <img src={venue.img} alt={venue.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">{venue.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer Meta */}
      <footer className="relative z-10 border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono text-muted-foreground uppercase opacity-50 tracking-[0.2em]">
            © 2024 CrowdPulse Systems • X-Pulse Kernel v4.2.0
          </p>
          <div className="flex items-center space-x-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="/developer" className="hover:text-primary transition-colors text-primary/80">Developer</a>
          </div>
        </div>
      </footer>

      {isVerifyModalOpen && (
        <TicketVerify 
          showCloseButton 
          onClose={() => setIsVerifyModalOpen(false)}
          onSuccess={() => {
            setIsVerifyModalOpen(false);
            if (postVerifyRoute) router.push(postVerifyRoute);
          }}
        />
      )}

    </div>
  );
}

