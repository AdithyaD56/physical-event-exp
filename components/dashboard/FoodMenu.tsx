"use client";

import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Clock,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  Circle
} from "lucide-react";
import { useState, useMemo } from "react";
import { getMenuByVenue } from "@/mock-data/menu";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Snacks", "Mains", "Drinks", "Desserts", "Biryani"];

export function FoodMenu() {
  const selectedVenue = useAppStore((state) => state.selectedVenue);
  const isVerified = useAppStore((state) => state.isVerified);
  const user = useAppStore((state) => state.user);
  const addToCart = useAppStore((state) => state.addToCart);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const venueMenu = useMemo(() => {
    return getMenuByVenue(selectedVenue?.id || 'wankhede');
  }, [selectedVenue?.id]);

  const currencySymbol = useMemo(() => {
    // Wankhede/NMS use INR, others use their respective currency from ticketTypes or default
    if (selectedVenue?.id === 'wankhede' || selectedVenue?.id === 'narendra-modi') return '₹';
    return selectedVenue?.ticketTypes?.[0]?.currency || '$';
  }, [selectedVenue]);

  const filteredItems = venueMenu.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularPicks = venueMenu.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Menu Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-bold text-primary uppercase tracking-widest">
            <ShoppingBag className="h-3 w-3" />
            <span>Digital Concierge</span>
          </div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            {selectedVenue?.defaultEventType === 'cricket' && "🏏 Cricket Feast"}
            {selectedVenue?.defaultEventType === 'football' && "⚽ Football Bites"}
            {selectedVenue?.defaultEventType === 'concert' && "🎵 Event Snacks"}
            {(!selectedVenue?.defaultEventType || !['cricket', 'football', 'concert'].includes(selectedVenue.defaultEventType)) && "🍴 Gourmet Menu"}
          </h2>
          <p className="text-xs text-muted-foreground">
            Delivered to your seat • Skip the queue • <span className="text-primary/70">{selectedVenue?.name}</span>
          </p>
        </div>

        {/* Dynamic Search */}
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text"
            placeholder="Search for food or drinks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Sidebar: Context Widgets */}
        <div className="lg:col-span-3 space-y-6">
          {/* Ticket Status */}
          <div className={cn(
            "glass-panel rounded-[2rem] p-6 space-y-4 border transition-all",
            isVerified ? "bg-green-500/5 border-green-500/20" : "bg-white/5 border-white/5"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  isVerified ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white/50"
                )}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Ticket Status</h4>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                    {isVerified ? "Verified Session" : "Guest Access"}
                  </p>
                </div>
              </div>
            </div>

            {isVerified && user.assignedSeat && (
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>Delivering To</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between border border-white/5">
                  <p className="text-sm font-black text-white">
                    Section {user.assignedSeat.section}, Row {user.assignedSeat.row}
                  </p>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md">✓ Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Status */}
          <div className="glass-panel border-white/5 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group">
            <h4 className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-widest">Operational Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border bg-primary/10 border-primary">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-white">Fast Delivery</span>
                  <span className="text-[9px] font-bold uppercase text-primary">Active</span>
                </div>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Orders are currently being fulfilled within <span className="text-white font-bold">12-15 minutes</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Categories & Grid */}
        <div className="lg:col-span-9 space-y-8">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide space-x-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap text-xs font-black uppercase tracking-wider",
                  activeCategory === cat
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Popular Picks */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 px-1">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Chef Recommended</h3>
            </div>
            <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4">
              {popularPicks.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="min-w-[220px] h-72 glass-panel border-white/5 rounded-3xl p-4 flex flex-col justify-between group relative cursor-pointer"
                >
                  <div className="h-32 w-full rounded-2xl overflow-hidden mb-3 relative">
                    <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute top-2 right-2 h-8 w-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-xs border border-white/10">
                      ⭐️
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" /> Ready in ~10m
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="font-black text-lg text-primary">{currencySymbol}{item.price}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Full Menu Grid */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 px-1">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white/50">Full Menu</h3>
              <div className="h-px flex-1 bg-white/5 ml-4"></div>
              <span className="text-[10px] font-mono text-muted-foreground">{filteredItems.length} items</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="glass-panel border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/8 transition-all"
                >
                  <div className="flex items-center space-x-4 mr-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground italic leading-tight mt-1 capitalize">{item.category} • Freshly prepared</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 shrink-0">
                    <p className="font-black text-sm text-primary">{currencySymbol}{item.price}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="h-10 w-10 bg-white/5 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all border border-white/10"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
