"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { venues } from "@/mock-data/venues";
import { useAppStore } from "@/store/useAppStore";
import { Venue } from "@/types";

export default function VenueSelection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const setVenue = useAppStore((state) => state.setVenue);

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectVenue = (venue: Venue) => {
    setVenue(venue);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-2xl mx-auto mb-16 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight neon-glow">Where are you heading?</h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
          Select your stadium to activate <span className="text-primary font-bold">CrowdPulse Live</span> insights and smart AI-powered navigation.
        </p>
        
        <div className="relative pt-6 max-w-md mx-auto">
          <Search className="absolute left-4 top-[calc(50%+12px)] -translate-y-1/2 text-primary h-5 w-5" />
          <Input 
            className="h-14 pl-12 pr-4 text-lg rounded-2xl bg-black/40 backdrop-blur-md border-white/10 focus-visible:ring-primary shadow-2xl"
            placeholder="Search venue or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.map((venue, idx) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-[0_0_30px_-12px_rgba(var(--primary),0.5)] transition-all group glass-panel border-white/5 rounded-3xl"
              onClick={() => handleSelectVenue(venue)}
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80" />
                <img 
                  src={venue.imageUrl} 
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute top-4 right-4 z-20 flex flex-col items-end space-y-2">
                  <div className={`px-3 py-1 backdrop-blur-md rounded-full border text-[10px] font-bold uppercase tracking-widest ${
                    venue.defaultEventType === 'cricket' 
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                      : venue.defaultEventType === 'football'
                      ? 'bg-green-500/20 border-green-500/40 text-green-300'
                      : 'bg-primary/20 border-primary/40 text-primary'
                  }`}>
                    {venue.defaultEventType === 'cricket' ? '🏏 Cricket' 
                      : venue.defaultEventType === 'football' ? '⚽ Football' 
                      : '🎵 Concert'}
                  </div>
                  <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-green-400">
                    LIVE TELEMETRY
                  </div>
                </div>
                <div className="absolute bottom-4 left-6 right-4 z-20">
                  <h3 className="text-white font-black text-2xl truncate tracking-tight">{venue.name}</h3>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm font-medium">{venue.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-sm font-medium">Capacity: {venue.capacity.toLocaleString()}</span>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Ticket Categories</span>
                    <span className="text-[10px] font-bold text-primary">Starting from {venue.ticketTypes?.[0]?.currency || '₹'}{venue.ticketTypes?.[0]?.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {venue.ticketTypes?.map((ticket) => (
                      <div 
                        key={ticket.id}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/70 flex items-center"
                      >
                        <div className="h-1.5 w-1.5 rounded-full mr-1.5" style={{ backgroundColor: ticket.color }} />
                        {ticket.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredVenues.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No venues found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
