"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Ticket, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface TicketVerifyProps {
  onSuccess?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function TicketVerify({ onSuccess, onClose, showCloseButton }: TicketVerifyProps) {
  const isVerified = useAppStore((state) => state.isVerified);
  const setVerified = useAppStore((state) => state.setVerified);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setError(false);
    
    // Simulating CrowdPulse-X demo codes (MATCH2026, FAN2026)
    setTimeout(() => {
      const upperCode = code.toUpperCase();
      if (upperCode.includes('2026')) {
        setVerified(true, {
          section: 'A14',
          row: '3',
          seat: '9'
        });
        if (onSuccess) onSuccess();
      } else {
        setError(true);
      }
      setIsVerifying(false);
    }, 1500);
  };

  // Only auto-hide if no callback is provided (standard dashboard behavior)
  if (isVerified && !onSuccess) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-panel border-white/10 p-10 rounded-[3rem] max-w-md w-full shadow-[0_0_100px_-20px_rgba(var(--primary),0.1)] relative overflow-hidden"
      >
        {showCloseButton && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <div className="h-24 w-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center relative group">
            <ShieldCheck className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight text-white leading-none">Security Access</h2>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              Enter your <span className="text-primary font-bold">2026 Authorization Passcode</span> to initialize session telemetry and tactical sync.
            </p>
          </div>

          <div className="w-full space-y-4">
            <div className="relative">
              <input 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && code && handleVerify()}
                placeholder="TOKEN_REQUIRED"
                autoFocus
                className={cn(
                  "w-full h-16 bg-white/5 border border-white/10 rounded-[1.5rem] text-center text-2xl font-black transition-all placeholder:text-white/5 uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                  error && "border-[#FF4B4B] bg-[#FF4B4B]/5 text-[#FF4B4B]"
                )}
              />
              <AnimatePresence>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[#FF4B4B] text-[10px] mt-2 font-black uppercase tracking-widest"
                  >
                    Authorization Failure: Token Invalid
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !code}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-[1.5rem] font-black text-sm tracking-widest group relative overflow-hidden shadow-[0_0_30px_rgba(var(--primary),0.3)]"
            >
              {isVerifying ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span className="flex items-center">
                  VALIDATE TOKEN <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            
            <div className="pt-4 border-t border-white/5">
              <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                Demo Access: <span className="text-white font-bold tracking-normal underline underline-offset-4 decoration-primary/50 cursor-help" title="Development Bypass">MATCH2026</span> or <span className="text-white font-bold">FAN2026</span>
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 h-px bg-primary/20 top-0 animate-[scan_4s_linear_infinite] pointer-events-none"></div>
      </motion.div>
    </div>
  );
}

