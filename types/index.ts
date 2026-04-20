export type EventType = 'football' | 'cricket' | 'concert';

export interface User {
  id: string;
  name: string;
  type: 'guest' | 'verified';
  avatar: string;
  assignedSeat?: {
    section: string;
    row: string;
    seat: string;
  };
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  queues?: any[];
  events?: any[];
  navigationPath?: string;
  markerX?: number[];
  markerY?: number[];
  // New CrowdPulse fields
  defaultEventType: EventType;
  layout?: StadiumLayout;
  liveTelemetry?: LiveEvent;
  ticketTypes?: TicketType[];
}

export interface TicketType {
  id: string;
  label: string;
  price: number;
  color: string;
  currency?: string;
}

export interface StadiumLayout {
  viewBox: string;
  pitch: {
    type: 'rect' | 'oval';
    d: string;
  };
  stands: {
    id: string;
    label: string;
    path: string;
  }[];
  amenities: {
    id: string;
    type: 'gate' | 'food' | 'restroom' | 'parking';
    x: number;
    y: number;
    status: 'clear' | 'moderate' | 'busy';
    label?: string;
  }[];
}

export interface CrowdDensity {
  sectionId: string;
  level: 'low' | 'moderate' | 'high';
  percentage: number;
}

export interface Facility {
  id: string;
  type: 'food' | 'restroom' | 'gate' | 'exit' | 'parking';
  name: string;
  section: string;
  waitTime: number; // in minutes
  coordinates: { lat: number; lng: number };
}

export interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'emergency';
  timestamp: string;
  icon?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

export interface CricketEvent {
  battingTeam: string;
  bowlingTeam: string;
  runs: number;
  wickets: number;
  overs: string;
  crr: string;
  lastBall: string;
  target?: number;
}

export interface FootballEvent {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: 'LIVE' | 'FT' | 'UPCOMING';
  recentAction?: string;
}

export interface CulturalEvent {
  performer: string;
  stage: string;
  currentSong?: string;
  nextSong?: string;
  pulseEnergy: number; // 1-100
  startTime: string;
}

export interface LiveEvent {
  id: string;
  type: EventType;
  venue: string;
  data: CricketEvent | FootballEvent | CulturalEvent;
}

