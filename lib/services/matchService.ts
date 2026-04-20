import { LiveEvent } from '@/types';

// CrowdPulse-X: Returns live event telemetry for all active venues
export async function getLiveEvents(): Promise<LiveEvent[]> {
  // Simulating the telemetry feed for CrowdPulse X
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
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
        {
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
            recentAction: 'VAR CHECK - PENALTY'
          }
        },
        {
          id: 'live-msg',
          type: 'concert',
          venue: 'Madison Square Garden',
          data: {
            performer: 'LINKIN PARK',
            stage: 'PULSE STAGE',
            currentSong: 'In The End',
            nextSong: 'Numb',
            pulseEnergy: 94,
            startTime: '20:30'
          }
        }
      ]);
    }, 800);
  });
}
