import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Venue, Alert, CartItem, User, EventType } from '@/types';
import { venues } from '@/mock-data/venues';

interface AppState {
  // CrowdPulse-X User Flow
  user: User;
  setUser: (user: User) => void;
  currentEventType: EventType;
  setEventType: (type: EventType) => void;
  
  selectedVenue: Venue | null;
  setVenue: (venue: Venue) => void;
  emergencies: Alert[];
  addEmergency: (alert: Alert) => void;
  clearEmergencies: () => void;
  accessibilityMode: boolean;
  toggleAccessibility: () => void;
  isEmergencyMode: boolean;
  setEmergencyMode: (active: boolean) => void;
  
  isVerified: boolean;
  setVerified: (verified: boolean, seat?: User['assignedSeat']) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  // AI Assistant Settings
  geminiKey: string | null;
  setGeminiKey: (key: string | null) => void;
  pendingQuestion: string | null;
  setPendingQuestion: (question: string | null) => void;
  
  // Tactical Navigation
  activeNavTargetId: string | null;
  setNavTarget: (id: string | null) => void;
  routeOriginId: string | null;
  routeDestinationId: string | null;
  setRoute: (originId: string | null, destId: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        id: 'guest-1',
        name: 'Guest Attendee',
        type: 'guest',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      },
      setUser: (user) => set({ user }),
      currentEventType: 'cricket',
      setEventType: (type) => set({ currentEventType: type }),

      selectedVenue: venues[0], // Default Wankhede, will be overwritten by persist if present
      setVenue: (venue) => set({ 
        selectedVenue: venue,
        currentEventType: venue.defaultEventType
      }),
      emergencies: [],
      addEmergency: (alert) => set((state) => ({ emergencies: [...state.emergencies, alert] })),
      clearEmergencies: () => set({ emergencies: [] }),
      accessibilityMode: false,
      toggleAccessibility: () => set((state) => ({ accessibilityMode: !state.accessibilityMode })),
      isEmergencyMode: false,
      setEmergencyMode: (active) => set({ isEmergencyMode: active }),
      isVerified: false,
      setVerified: (verified, seat) => set((state) => ({ 
        isVerified: verified,
        user: { 
          ...state.user, 
          type: verified ? 'verified' : 'guest',
          assignedSeat: seat 
        }
      })),
      cart: [],
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(i => i.id !== itemId)
      })),
      clearCart: () => set({ cart: [] }),

      geminiKey: null,
      setGeminiKey: (key) => set({ geminiKey: key }),
      pendingQuestion: null,
      setPendingQuestion: (question) => set({ pendingQuestion: question }),

      activeNavTargetId: null,
      setNavTarget: (id) => set({ activeNavTargetId: id }),
      routeOriginId: null,
      routeDestinationId: null,
      setRoute: (originId, destId) => set({ 
        routeOriginId: originId, 
        routeDestinationId: destId,
        activeNavTargetId: null // Clear simple nav when complex route is active
      }),
    }),
    {
      name: 'crowdpulse-storage',
      storage: createJSONStorage(() => localStorage),
      // Optionally only persist certain fields
      partialize: (state) => ({ 
        selectedVenue: state.selectedVenue,
        currentEventType: state.currentEventType,
        user: state.user,
        isVerified: state.isVerified,
        cart: state.cart
      }),
    }
  )
);
