import { Venue } from '@/types';

export const venues: Venue[] = [
  // ─────────────────────────────────────────────
  // 🏏 CRICKET — PRIORITY 1
  // ─────────────────────────────────────────────
  {
    id: 'wankhede',
    name: 'Wankhede Stadium',
    location: 'Mumbai, India',
    capacity: 33108,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200', // Wankhede Stadium (Generic)
    coordinates: { lat: 18.9389, lng: 72.8258 },
    defaultEventType: 'cricket',
    ticketTypes: [
      { id: 't1', label: 'General Stand', price: 500, color: '#22c55e' },
      { id: 't2', label: 'Premium Pavilion', price: 2000, color: '#3b82f6' },
      { id: 't3', label: 'Corporate Box', price: 8000, color: '#f59e0b' },
      { id: 't4', label: 'VIP Lounge', price: 20000, color: '#0ea5e9' },
    ],
    layout: {
      viewBox: "0 0 800 600",
      pitch: {
        type: 'oval',
        d: "M 400 300 m -130 0 a 130 95 0 1 0 260 0 a 130 95 0 1 0 -260 0"
      },
      stands: [
        { id: 'north', label: 'North Stand', path: "M 150 50 Q 400 10 650 50 L 700 150 Q 400 110 100 150 Z" },
        { id: 'tendulkar', label: 'Sachin Tendulkar Stand', path: "M 700 150 Q 780 300 700 450 L 620 450 Q 700 300 620 150 Z" },
        { id: 'garware', label: 'Garware Pavilion', path: "M 100 150 Q 20 300 100 450 L 180 450 Q 100 300 180 150 Z" },
        { id: 'gavaskar', label: 'Sunil Gavaskar Stand', path: "M 150 550 Q 400 590 650 550 L 620 450 Q 400 490 180 450 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 400, y: 20, status: 'busy', label: 'Gate A (North)' },
        { id: 'g-B', type: 'gate', x: 755, y: 300, status: 'clear', label: 'Gate B (East)' },
        { id: 'g-C', type: 'gate', x: 400, y: 580, status: 'clear', label: 'Gate C (South)' },
        { id: 'g-D', type: 'gate', x: 45, y: 300, status: 'moderate', label: 'Gate D (Garware)' },
        { id: 'f-1', type: 'food', x: 680, y: 120, status: 'moderate', label: 'Food Court 1' },
        { id: 'f-2', type: 'food', x: 120, y: 470, status: 'clear', label: 'Food Court 2' },
        { id: 'r-1', type: 'restroom', x: 680, y: 470, status: 'clear', label: 'Restroom Block A' },
        { id: 'r-2', type: 'restroom', x: 120, y: 130, status: 'clear', label: 'Restroom Block B' },
        { id: 'p-1', type: 'parking', x: 200, y: 585, status: 'clear', label: 'P1 – South Lot' },
      ]
    },
    liveTelemetry: {
      id: 'live-wankhede',
      type: 'cricket',
      venue: 'Wankhede Stadium',
      data: {
        battingTeam: 'MUMBAI INDIANS',
        bowlingTeam: 'CHENNAI KINGS',
        runs: 184,
        wickets: 4,
        overs: '18.2',
        crr: '10.04',
        lastBall: '6 RUNS!'
      }
    },
    queues: [
      { id: 'q1', name: 'Vada Pav Corner', section: 'Sachin Stand', waitTime: 4, type: 'food' },
      { id: 'q2', name: 'Gate A Entry', section: 'North Stand', waitTime: 12, type: 'gate' },
      { id: 'q3', name: 'East Restroom', section: 'Garware Stand', waitTime: 1, type: 'restroom' }
    ],
    events: [
      { id: 'e1', time: '19:30', name: 'MI vs CSK — Toss', type: 'pre-match' },
      { id: 'e2', time: '20:00', name: 'Match Start', type: 'match' },
      { id: 'e3', time: '21:30', name: 'Mid-Innings Break', type: 'break' }
    ]
  },

  {
    id: 'narendra-modi',
    name: 'Narendra Modi Stadium',
    location: 'Ahmedabad, India',
    capacity: 132000,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200', // Narendra Modi Stadium (Generic)
    coordinates: { lat: 23.0917, lng: 72.5972 },
    defaultEventType: 'cricket',
    ticketTypes: [
      { id: 't1', label: 'General Stand', price: 400, color: '#22c55e' },
      { id: 't2', label: 'Club House', price: 3000, color: '#3b82f6' },
      { id: 't3', label: 'Premium Box', price: 12000, color: '#f59e0b' },
      { id: 't4', label: 'VVIP Suite', price: 50000, color: '#0ea5e9' },
    ],
    layout: {
      viewBox: "0 0 900 700",
      pitch: {
        type: 'oval',
        d: "M 450 350 m -240 0 a 240 200 0 1 0 480 0 a 240 200 0 1 0 -480 0"
      },
      stands: [
        { id: 'gujarat', label: 'Gujarat Pavilion', path: "M 100 150 Q 450 30 800 150 L 850 250 Q 450 120 50 250 Z" },
        { id: 'reliance', label: 'Reliance Stand', path: "M 800 150 Q 920 350 800 550 L 700 550 Q 800 350 700 150 Z" },
        { id: 'adani', label: 'Adani Stand', path: "M 100 550 Q 450 670 800 550 L 850 450 Q 450 530 50 450 Z" },
        { id: 'nita', label: 'Nita Ambani Stand', path: "M 100 150 Q -20 350 100 550 L 200 550 Q 100 350 200 150 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 450, y: 35, status: 'busy', label: 'Gate 1 (North)' },
        { id: 'g-B', type: 'gate', x: 865, y: 350, status: 'moderate', label: 'Gate 2 (East)' },
        { id: 'g-C', type: 'gate', x: 450, y: 665, status: 'clear', label: 'Gate 3 (South)' },
        { id: 'g-D', type: 'gate', x: 35, y: 350, status: 'clear', label: 'Gate 4 (West)' },
        { id: 'f-1', type: 'food', x: 810, y: 220, status: 'busy', label: 'Food Pavilion A' },
        { id: 'f-2', x: 90, y: 480, type: 'food', status: 'clear', label: 'Food Pavilion B' },
        { id: 'r-1', type: 'restroom', x: 810, y: 480, status: 'moderate', label: 'Restroom East' },
        { id: 'r-2', type: 'restroom', x: 90, y: 220, status: 'clear', label: 'Restroom West' },
        { id: 'p-1', type: 'parking', x: 200, y: 670, status: 'clear', label: 'P-Block South' },
      ]
    },
    liveTelemetry: {
      id: 'live-nms',
      type: 'cricket',
      venue: 'Narendra Modi Stadium',
      data: {
        battingTeam: 'INDIA',
        bowlingTeam: 'AUSTRALIA',
        runs: 312,
        wickets: 6,
        overs: '80.4',
        crr: '3.87',
        lastBall: 'FOUR!'
      }
    },
    queues: [
      { id: 'q1', name: 'Premium Biryani Stall', section: 'Main Concourse', waitTime: 15, type: 'food' },
      { id: 'q2', name: 'Security Check Gate 1', section: 'North Entry', waitTime: 45, type: 'gate' }
    ],
    events: [
      { id: 'e1', time: '09:30', name: 'IND vs AUS — Day 3', type: 'match' }
    ]
  },

  // ─────────────────────────────────────────────
  // ⚽ FOOTBALL — PRIORITY 2
  // ─────────────────────────────────────────────
  {
    id: 'wembley',
    name: 'Wembley Stadium',
    location: 'London, UK',
    capacity: 90000,
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647efcd6ef2?q=80&w=1200', // Wembley Stadium (Generic)
    coordinates: { lat: 51.5560, lng: -0.2796 },
    defaultEventType: 'football',
    ticketTypes: [
      { id: 't1', label: 'General Admission', price: 35, color: '#22c55e', currency: '£' },
      { id: 't2', label: 'Category A', price: 90, color: '#3b82f6', currency: '£' },
      { id: 't3', label: 'Category B', price: 65, color: '#f59e0b', currency: '£' },
      { id: 't4', label: 'Hospitality Suite', price: 400, color: '#0ea5e9', currency: '£' },
    ],
    layout: {
      viewBox: "0 0 800 600",
      pitch: {
        type: 'rect',
        d: "M 170 130 L 630 130 L 630 470 L 170 470 Z"
      },
      stands: [
        { id: 'north', label: 'North Stand', path: "M 50 50 L 750 50 L 750 115 L 50 115 Z" },
        { id: 'south', label: 'South Stand', path: "M 50 485 L 750 485 L 750 550 L 50 550 Z" },
        { id: 'east', label: 'East Stand', path: "M 640 115 L 750 115 L 750 485 L 640 485 Z" },
        { id: 'west', label: 'West / Royal Box', path: "M 50 115 L 160 115 L 160 485 L 50 485 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 400, y: 28, status: 'moderate', label: 'Gate A (North)' },
        { id: 'g-B', type: 'gate', x: 755, y: 300, status: 'clear', label: 'Gate B (East)' },
        { id: 'g-C', type: 'gate', x: 400, y: 572, status: 'clear', label: 'Gate C (South)' },
        { id: 'g-D', type: 'gate', x: 30, y: 300, status: 'busy', label: 'Gate D (West)' },
        { id: 'f-1', type: 'food', x: 700, y: 80, status: 'moderate', label: 'Heineken Bar NE' },
        { id: 'f-2', type: 'food', x: 100, y: 520, status: 'clear', label: 'Pie & Mash SW' },
        { id: 'r-1', type: 'restroom', x: 700, y: 520, status: 'clear', label: 'WC Block SE' },
        { id: 'r-2', type: 'restroom', x: 100, y: 80, status: 'clear', label: 'WC Block NW' },
        { id: 'p-1', type: 'parking', x: 400, y: 572, status: 'moderate', label: 'South Car Park' },
      ]
    },
    liveTelemetry: {
      id: 'live-wembley',
      type: 'football',
      venue: 'Wembley Stadium',
      data: {
        homeTeam: 'ENGLAND',
        awayTeam: 'ITALY',
        homeScore: 2,
        awayScore: 1,
        time: '74',
        status: 'LIVE',
        recentAction: 'VAR CHECK — PENALTY'
      }
    },
    queues: [
      { id: 'q1', name: 'Pie & Pint Corner', section: 'West Concourse', waitTime: 15, type: 'food' },
      { id: 'q2', name: 'Turnstile Check', section: 'Turnstile B', waitTime: 10, type: 'gate' }
    ],
    events: [
      { id: 'e1', time: '20:00', name: 'EURO Finals — Kickoff', type: 'match' }
    ]
  },

  {
    id: 'camp-nou',
    name: 'Camp Nou',
    location: 'Barcelona, Spain',
    capacity: 99354,
    imageUrl: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200', // Camp Nou (Generic)
    coordinates: { lat: 41.3809, lng: 2.1228 },
    defaultEventType: 'football',
    ticketTypes: [
      { id: 't1', label: 'General Admission', price: 40, color: '#22c55e', currency: '€' },
      { id: 't2', label: 'Preferent', price: 120, color: '#3b82f6', currency: '€' },
      { id: 't3', label: 'VIP Tribune', price: 350, color: '#f59e0b', currency: '€' },
      { id: 't4', label: 'Palco (Box)', price: 900, color: '#0ea5e9', currency: '€' },
    ],
    layout: {
      viewBox: "0 0 800 600",
      pitch: {
        type: 'rect',
        d: "M 180 120 L 620 120 L 620 480 L 180 480 Z"
      },
      stands: [
        { id: 'north', label: 'Nord (Gol Nord)', path: "M 50 10 Q 400 -10 750 10 L 800 100 Q 400 80 0 100 Z" },
        { id: 'south', label: 'Sud (Gol Sud)', path: "M 50 590 Q 400 610 750 590 L 800 500 Q 400 520 0 500 Z" },
        { id: 'lateral-1', label: 'Lateral 1 (Tribuna)', path: "M 10 70 Q -20 300 10 530 L 160 500 Q 130 300 160 100 Z" },
        { id: 'lateral-2', label: 'Lateral 2 (Amfitreat)', path: "M 790 70 Q 820 300 790 530 L 640 500 Q 670 300 640 100 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 400, y: 15, status: 'busy', label: 'Accés Nord' },
        { id: 'g-B', type: 'gate', x: 785, y: 300, status: 'moderate', label: 'Accés Est' },
        { id: 'g-C', type: 'gate', x: 400, y: 585, status: 'clear', label: 'Accés Sud' },
        { id: 'g-D', type: 'gate', x: 15, y: 300, status: 'clear', label: 'Accés Oest' },
        { id: 'f-1', type: 'food', x: 710, y: 100, status: 'moderate', label: 'Bar Tapas NE' },
        { id: 'f-2', type: 'food', x: 90, y: 500, status: 'clear', label: 'Bocata Bar SW' },
        { id: 'r-1', type: 'restroom', x: 710, y: 500, status: 'clear', label: 'WC Sud-Est' },
        { id: 'r-2', type: 'restroom', x: 90, y: 100, status: 'clear', label: 'WC Nord-Oest' },
        { id: 'p-1', type: 'parking', x: 200, y: 590, status: 'moderate', label: 'Aparcament P1' },
      ]
    },
    liveTelemetry: {
      id: 'live-campnou',
      type: 'football',
      venue: 'Camp Nou',
      data: {
        homeTeam: 'BARCELONA',
        awayTeam: 'REAL MADRID',
        homeScore: 3,
        awayScore: 2,
        time: '88',
        status: 'LIVE',
        recentAction: 'GOAL! 88\' — Lamine Yamal'
      }
    },
    queues: [
      { id: 'q1', name: 'Tapas Bar Lateral', section: 'VIP Level', waitTime: 6, type: 'food' },
      { id: 'q2', name: 'Museum Entry', section: 'Entrance 7', waitTime: 55, type: 'gate' }
    ],
    events: [
      { id: 'e1', time: '21:00', name: 'El Clásico', type: 'match' }
    ]
  },

  // ─────────────────────────────────────────────
  // 🎵 CULTURAL / CONCERTS — PRIORITY 3
  // ─────────────────────────────────────────────
  {
    id: 'msg',
    name: 'Madison Square Garden',
    location: 'New York, USA',
    capacity: 19500,
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1200', // Madison Square Garden (Generic)
    coordinates: { lat: 40.7505, lng: -73.9934 },
    defaultEventType: 'concert',
    ticketTypes: [
      { id: 't1', label: 'Floor Standing', price: 120, color: '#22c55e', currency: '$' },
      { id: 't2', label: 'Lower Bowl', price: 220, color: '#3b82f6', currency: '$' },
      { id: 't3', label: 'Upper Bowl', price: 85, color: '#f59e0b', currency: '$' },
      { id: 't4', label: 'VIP Meet & Greet', price: 950, color: '#0ea5e9', currency: '$' },
    ],
    layout: {
      viewBox: "0 0 800 700",
      pitch: {
        type: 'rect',
        d: "M 280 80 L 520 80 L 520 200 L 280 200 Z"
      },
      stands: [
        { id: 'floor', label: 'Floor (GA)', path: "M 200 210 L 600 210 L 600 500 L 200 500 Z" },
        { id: 'lower-bowl', label: 'Lower Bowl', path: "M 60 60 A 340 310 0 1 1 740 60 L 740 200 A 280 250 0 1 0 60 200 Z" },
        { id: 'upper-bowl', label: 'Upper Bowl', path: "M 20 40 A 380 340 0 1 1 780 40 L 740 60 A 340 310 0 1 0 60 60 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 400, y: 20, status: 'moderate', label: 'Main Entrance (7th Ave)' },
        { id: 'g-B', type: 'gate', x: 760, y: 350, status: 'clear', label: 'East Entrance' },
        { id: 'g-C', type: 'gate', x: 30, y: 350, status: 'busy', label: 'West Entrance' },
        { id: 'f-1', type: 'food', x: 700, y: 120, status: 'busy', label: 'Concessions NE' },
        { id: 'f-2', type: 'food', x: 100, y: 560, status: 'clear', label: 'Hot Dog SW' },
        { id: 'f-3', type: 'food', x: 700, y: 560, status: 'moderate', label: 'Bar & Nachos SE' },
        { id: 'r-1', type: 'restroom', x: 100, y: 120, status: 'clear', label: 'Restroom NW' },
        { id: 'r-2', type: 'restroom', x: 400, y: 640, status: 'moderate', label: 'Restroom South' },
      ]
    },
    liveTelemetry: {
      id: 'live-msg',
      type: 'concert',
      venue: 'Madison Square Garden',
      data: {
        performer: 'LINKIN PARK',
        stage: 'PULSE MAIN STAGE',
        currentSong: 'In The End',
        nextSong: 'Numb',
        pulseEnergy: 94,
        startTime: '20:30'
      }
    },
    queues: [
      { id: 'q1', name: 'NY Hot Dog Stand', section: 'Main Concourse', waitTime: 8, type: 'food' },
      { id: 'q2', name: 'Floor Access Check', section: 'Section 102', waitTime: 12, type: 'gate' }
    ],
    events: [
      { id: 'e1', time: '19:30', name: 'Doors Open', type: 'pre-match' },
      { id: 'e2', time: '20:30', name: 'Linkin Park — LIVE', type: 'match' }
    ]
  },

  {
    id: 'mcg',
    name: 'Melbourne Cricket Ground',
    location: 'Melbourne, Australia',
    capacity: 100024,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200', // MCG (Generic)
    coordinates: { lat: -37.8199, lng: 144.9834 },
    defaultEventType: 'cricket',
    ticketTypes: [
      { id: 't1', label: 'General Admission', price: 40, color: '#22c55e', currency: 'A$' },
      { id: 't2', label: 'Members Pavilion', price: 120, color: '#3b82f6', currency: 'A$' },
      { id: 't3', label: 'Olympic Stand', price: 80, color: '#f59e0b', currency: 'A$' },
      { id: 't4', label: 'Corporate Suite', price: 600, color: '#0ea5e9', currency: 'A$' },
    ],
    layout: {
      viewBox: "0 0 800 600",
      pitch: {
        type: 'oval',
        d: "M 400 300 m -220 0 a 220 160 0 1 0 440 0 a 220 160 0 1 0 -440 0"
      },
      stands: [
        { id: 'members', label: "Members' Stand", path: "M 100 150 Q 20 300 100 450 L 180 450 Q 100 300 180 150 Z" },
        { id: 'olympic', label: 'Olympic Stand', path: "M 700 150 Q 780 300 700 450 L 620 450 Q 700 300 620 150 Z" },
        { id: 'ponsford', label: 'Ponsford Stand', path: "M 150 550 Q 400 620 650 550 L 620 450 Q 400 510 180 450 Z" },
        { id: 'great-southern', label: 'Great Southern Stand', path: "M 150 50 Q 400 -20 650 50 L 620 150 Q 400 90 180 150 Z" },
      ],
      amenities: [
        { id: 'g-A', type: 'gate', x: 400, y: 15, status: 'moderate', label: 'Gate 1 (Northern)' },
        { id: 'g-B', type: 'gate', x: 785, y: 300, status: 'clear', label: 'Gate 2 (Olympic)' },
        { id: 'g-C', type: 'gate', x: 400, y: 585, status: 'clear', label: 'Gate 3 (Ponsford)' },
        { id: 'g-D', type: 'gate', x: 15, y: 300, status: 'busy', label: "Gate M (Members)" },
        { id: 'f-1', type: 'food', x: 710, y: 120, status: 'moderate', label: 'Aussie Pie Bar' },
        { id: 'f-2', type: 'food', x: 90, y: 480, status: 'clear', label: 'Tim Tam Kiosk' },
        { id: 'r-1', type: 'restroom', x: 710, y: 480, status: 'clear', label: 'Restroom SE' },
        { id: 'r-2', type: 'restroom', x: 90, y: 120, status: 'clear', label: 'Restroom NW' },
        { id: 'p-1', type: 'parking', x: 200, y: 590, status: 'moderate', label: 'Richmond Station P' },
      ]
    },
    liveTelemetry: {
      id: 'live-mcg',
      type: 'cricket',
      venue: 'Melbourne Cricket Ground',
      data: {
        battingTeam: 'AUSTRALIA',
        bowlingTeam: 'ENGLAND',
        runs: 256,
        wickets: 3,
        overs: '67.2',
        crr: '3.81',
        lastBall: 'NO BALL!'
      }
    },
    queues: [
      { id: 'q1', name: 'Meat Pie Stall', section: 'Southern Stand', waitTime: 20, type: 'food' },
      { id: 'q2', name: 'Members Reserved Entry', section: 'Gate M', waitTime: 5, type: 'gate' }
    ],
    events: [
      { id: 'e1', time: '10:30', name: 'Boxing Day Test — Day 1', type: 'match' }
    ]
  }
];
