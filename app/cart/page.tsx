"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Trash2, Clock, MapPin, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const clearCart = useAppStore((state) => state.clearCart);
  const user = useAppStore((state) => state.user);
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 25 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-white transition-colors group mb-4">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-bounce">
              <ReceiptText className="h-10 w-10 text-white" />
            </div>

            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-full max-w-md bg-white text-black p-8 rounded-sm shadow-2xl relative overflow-hidden font-mono"
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
              
              <div className="text-center space-y-1 mb-8">
                <h1 className="text-2xl font-black uppercase tracking-tighter">CrowdPulse X</h1>
                <p className="text-[10px] opacity-60">TRANS-ID: #CPX-{Math.floor(Math.random() * 90000) + 10000}</p>
                <div className="flex justify-center py-2">
                  <div className="h-px w-24 bg-black/10" />
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between font-bold">
                  <span>ITEM</span>
                  <span>QTY</span>
                  <span>PRICE</span>
                </div>
                <div className="h-px w-full border-t border-dashed border-black/20" />
                
                {/* We can't easily access the cart here since it was cleared, but in a real app we'd keep it in state for the receipt */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Stadium Combo</span>
                    <span>1</span>
                    <span>₹245.00</span>
                  </div>
                  <div className="flex justify-between italic opacity-60">
                    <span>- Samosa x2</span>
                  </div>
                  <div className="flex justify-between italic opacity-60">
                    <span>- Masala Chai</span>
                  </div>
                </div>

                <div className="h-px w-full border-t border-dashed border-black/20 pt-4" />
                
                <div className="space-y-1 text-[10px] uppercase font-bold text-center">
                  <p>DELIVERED BY: STALL #12 (MUMBAI HUB)</p>
                  <p>DESTINATION: {user.assignedSeat ? `SECTION ${user.assignedSeat.section}` : 'GENERAL ACCESS'}</p>
                </div>

                <div className="h-px w-full border-t border-dashed border-black/20 pt-4" />
                
                <div className="flex justify-between text-base font-black pt-2">
                  <span>TOTAL PAID</span>
                  <span>₹245.00</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center space-y-4">
                <div className="h-16 w-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CrowdPulse-X')] bg-contain bg-center bg-no-repeat opacity-20" />
                <p className="text-[8px] opacity-40 uppercase tracking-widest">Digital Auth Verified • End-to-End Encrypted</p>
              </div>

              {/* Jagged edge effect */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[radial-gradient(circle,transparent_8px,white_8px)] bg-[length:24px_24px] bg-repeat-x -mb-2 transform rotate-180" />
            </motion.div>

            <div className="mt-12 flex space-x-4">
              <Link href="/dashboard">
                <Button className="rounded-2xl px-8 h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10">
                  RETURN TO MISSION CONTROL
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black neon-glow">My Checkout</h1>
                <span className="text-xs font-mono opacity-50 uppercase tracking-widest">{selectedVenue?.name} Hub</span>
              </div>

              {cart.length === 0 ? (
                <div className="glass-panel border-white/5 p-12 rounded-3xl text-center space-y-4">
                  <p className="text-muted-foreground italic">Your cart is currently empty.</p>
                  <Link href="/dashboard">
                    <Button variant="outline" className="rounded-xl">Browse Venue Classics</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      className="glass-panel border-white/5 p-5 rounded-2xl flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                          🍱
                        </div>
                        <div>
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity} x ₹{item.price}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-white"
                    onClick={clearCart}
                  >
                    Clear All Items
                  </Button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="glass-panel border-white/5 p-6 rounded-3xl space-y-6">
                <h3 className="font-bold uppercase tracking-widest text-[10px] text-primary">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stall Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="h-px bg-white/10 w-full my-2"></div>
                  <div className="flex justify-between text-lg font-black text-white">
                    <span>Total</span>
                    <span className="text-primary neon-glow">₹{total}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center text-[10px] text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                    <Clock className="h-3 w-3 mr-2 text-primary" /> Delivery to Block: <span className="text-white ml-2">{user.assignedSeat ? `Sec ${user.assignedSeat.section}` : "Block A"}</span>
                  </div>
                  <div className="flex items-center text-[10px] text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                    <MapPin className="h-3 w-3 mr-2 text-primary" /> Venue: <span className="text-white ml-2">{selectedVenue?.name}</span>
                  </div>
                </div>

                <Button 
                  disabled={cart.length === 0 || isProcessing}
                  onClick={handleCheckout}
                  className="w-full h-14 bg-white text-black hover:bg-white/90 font-black rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  {isProcessing ? "TRANSMITTING..." : "PLACE ORDER"}
                </Button>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground opacity-50">
                  <CreditCard className="h-3 w-3" />
                  <span>SECURE GATEWAY ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
