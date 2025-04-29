import { DraftFlow } from '../types';

export const DRAFT_FLOWS: DraftFlow[] = [
  {
    name: "Standard Tournament",
    description: "Official tournament format with civilization and leader picks/bans",
    steps: [
      // Initial Civilization Bans
      { type: 'civilization', action: 'ban', team: 1, phase: 'ban-civilization' },
      { type: 'civilization', action: 'ban', team: 2, phase: 'ban-civilization' },
      
      // Leader Bans
      { type: 'leader', action: 'ban', team: 2, phase: 'ban-leader' },
      { type: 'leader', action: 'ban', team: 1, phase: 'ban-leader' },
      
      // First Souvenir Bans
      { type: 'souvenir', action: 'ban', team: 1, phase: 'ban-souvenir-1' },
      { type: 'souvenir', action: 'ban', team: 2, phase: 'ban-souvenir-1' },
      
      // Civilization Picks
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      
      // Leader Picks
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      
      // Final Souvenir Bans
      { type: 'souvenir', action: 'ban', team: 2, phase: 'ban-souvenir-2' },
      { type: 'souvenir', action: 'ban', team: 1, phase: 'ban-souvenir-2' }
    ]
  },
  {
    name: "Quick Draft",
    description: "Faster format with fewer picks and bans",
    steps: [
      // One ban each
      { type: 'civilization', action: 'ban', team: 1, phase: 'ban-civilization' },
      { type: 'civilization', action: 'ban', team: 2, phase: 'ban-civilization' },
      
      // Civilization Picks
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      
      // Leader Picks
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      
      // One souvenir ban each
      { type: 'souvenir', action: 'ban', team: 1, phase: 'ban-souvenir-1' },
      { type: 'souvenir', action: 'ban', team: 2, phase: 'ban-souvenir-1' }
    ]
  },
  {
    name: "Ban Heavy",
    description: "More bans, fewer picks for strategic depth",
    steps: [
      // Multiple civilization bans
      { type: 'civilization', action: 'ban', team: 1, phase: 'ban-civilization' },
      { type: 'civilization', action: 'ban', team: 2, phase: 'ban-civilization' },
      { type: 'civilization', action: 'ban', team: 2, phase: 'ban-civilization' },
      { type: 'civilization', action: 'ban', team: 1, phase: 'ban-civilization' },
      
      // Multiple leader bans
      { type: 'leader', action: 'ban', team: 2, phase: 'ban-leader' },
      { type: 'leader', action: 'ban', team: 1, phase: 'ban-leader' },
      { type: 'leader', action: 'ban', team: 1, phase: 'ban-leader' },
      { type: 'leader', action: 'ban', team: 2, phase: 'ban-leader' },
      
      // Picks
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 2, phase: 'pick-civilization' },
      { type: 'civilization', action: 'pick', team: 1, phase: 'pick-civilization' },
      
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 1, phase: 'pick-leader' },
      { type: 'leader', action: 'pick', team: 2, phase: 'pick-leader' },
      
      // Multiple souvenir bans
      { type: 'souvenir', action: 'ban', team: 1, phase: 'ban-souvenir-1' },
      { type: 'souvenir', action: 'ban', team: 2, phase: 'ban-souvenir-1' },
      { type: 'souvenir', action: 'ban', team: 2, phase: 'ban-souvenir-2' },
      { type: 'souvenir', action: 'ban', team: 1, phase: 'ban-souvenir-2' }
    ]
  }
];