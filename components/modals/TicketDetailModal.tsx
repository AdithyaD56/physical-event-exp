"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ReceiptText, ShieldCheck, MapPin, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TicketDetailModal({ isOpen, onClose }: TicketDetailModalProps) {
  const user = useAppStore((state) => state.user);
  const selectedVenue = useAppStore((state) => state.selectedVenue);

  if (!user.assignedSeat || !selectedVenue) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="ticket-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-full max-w-sm bg-white text-black p-8 rounded-sm shadow-2xl relative overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="text-center space-y-1 mb-8">
              <h1 className="text-2xl font-black uppercase tracking-tighter">Event Pass</h1>
              <p className="text-[10px] opacity-60 uppercase tracking-widest font-black">Auth Key: {user.id || 'GUEST-001'}</p>
              <div className="flex justify-center py-2">
                <div className="h-px w-24 bg-black/10" />
              </div>
            </div>

            <div className="space-y-6 text-xs">
              <div className="flex justify-between font-bold">
                <span>VENUE DATA</span>
                <span>STATUS</span>
              </div>
              <div className="h-px w-full border-t border-dashed border-black/20" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="opacity-40 uppercase text-[9px]">Location</p>
                    <p className="font-black text-sm uppercase">{selectedVenue.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-40 uppercase text-[9px]">City</p>
                    <p className="font-black text-sm uppercase">{selectedVenue.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 bg-black/5 rounded-sm p-4">
                  <div className="text-center">
                    <p className="opacity-40 uppercase text-[8px]">Section</p>
                    <p className="text-lg font-black">{user.assignedSeat.section}</p>
                  </div>
                  <div className="text-center border-x border-black/10">
                    <p className="opacity-40 uppercase text-[8px]">Row</p>
                    <p className="text-lg font-black">{user.assignedSeat.row}</p>
                  </div>
                  <div className="text-center">
                    <p className="opacity-40 uppercase text-[8px]">Seat</p>
                    <p className="text-lg font-black">{user.assignedSeat.seat}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-black/5 flex items-center justify-center">
                      <ShieldCheck className="h-3 w-3" />
                    </div>
                    <span className="font-black uppercase text-[10px]">Verified Digital Asset</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-black/5 flex items-center justify-center">
                      <Zap className="h-3 w-3" />
                    </div>
                    <span className="font-black uppercase text-[10px]">Telemetry Stream Active</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full border-t border-dashed border-black/20 pt-4" />
              
              <div className="space-y-1 text-[10px] uppercase font-bold text-center opacity-60">
                <p>DO NOT SHARE ACCESS KEY</p>
                <p>VALID UNTIL END OF COMP</p>
              </div>

              <div className="h-px w-full border-t border-dashed border-black/20 pt-4" />
              
              <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="h-24 w-24 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket-Verified')] bg-contain bg-center bg-no-repeat grayscale contrast-125" />
                <p className="text-[9px] opacity-40 uppercase tracking-widest text-center">Scan at checkpoint for tactical override access</p>
              </div>
            </div>

            {/* Jagged edge effect */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[radial-gradient(circle,transparent_8px,white_8px)] bg-[length:24px_24px] bg-repeat-x -mb-2 transform rotate-180" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
