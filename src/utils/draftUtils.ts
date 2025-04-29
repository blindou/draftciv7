import { Civilization, Leader, Souvenir, DraftState, DraftPhase, Team, ItemType, DraftSettings } from '../types';
import civilizationsData from '../data/civilizations.json';
import leadersData from '../data/leaders.json';
import souvenirsData from '../data/souvenirs.json';

// Initialize data with custom auto-bans
export const initializeData = (settings: DraftSettings): {
  civilizations: Civilization[];
  leaders: Leader[];
  souvenirs: Souvenir[];
} => {
  const civilizations = civilizationsData.civilizations.filter(
    civ => !settings.autoBannedCivilizations.includes(civ.id)
  ) as Civilization[];

  const leaders = leadersData.leaders.filter(
    leader => !settings.autoBannedLeaders.includes(leader.id)
  ) as Leader[];

  const souvenirs = souvenirsData.souvenirs.filter(
    souvenir => !settings.autoBannedSouvenirs.includes(souvenir.id)
  ) as Souvenir[];

  return { civilizations, leaders, souvenirs };
};

// Initialize empty teams with custom names
export const initializeTeams = (settings: DraftSettings): [Team, Team] => {
  return [
    {
      id: 1,
      name: settings.team1Name,
      bannedCivilizations: [],
      bannedLeaders: [],
      bannedSouvenirs: [],
      pickedCivilizations: [],
      pickedLeaders: []
    },
    {
      id: 2,
      name: settings.team2Name,
      bannedCivilizations: [],
      bannedLeaders: [],
      bannedSouvenirs: [],
      pickedCivilizations: [],
      pickedLeaders: []
    }
  ];
};

// Initialize draft state with settings
export const initializeDraftState = (settings: DraftSettings): DraftState => {
  const { civilizations, leaders, souvenirs } = initializeData(settings);
  const teams = initializeTeams(settings);

  return {
    currentPhase: 'ban-civilization',
    currentTeam: 1,
    teams,
    availableCivilizations: civilizations,
    availableLeaders: leaders,
    availableSouvenirs: souvenirs,
    pickIndex: 0,
    isComplete: false,
    settings
  };
};

// Pick orders
export const CIVILIZATION_PICK_ORDER = [1, 2, 2, 1, 1, 2, 2, 1];
export const LEADER_PICK_ORDER = [2, 1, 1, 2, 2, 1, 1, 2];

// Get the next phase in the draft
export const getNextPhase = (currentPhase: DraftPhase): DraftPhase => {
  switch (currentPhase) {
    case 'ban-civilization':
      return 'ban-leader';
    case 'ban-leader':
      return 'ban-souvenir-1';
    case 'ban-souvenir-1':
      return 'pick-civilization';
    case 'pick-civilization':
      return 'pick-leader';
    case 'pick-leader':
      return 'ban-souvenir-2';
    case 'ban-souvenir-2':
      return 'complete';
    default:
      return 'complete';
  }
};

// Get the next team based on the current phase and pick index
export const getNextTeam = (
  currentPhase: DraftPhase, 
  currentTeam: number,
  pickIndex: number
): number => {
  if (currentPhase === 'ban-civilization') {
    return currentTeam === 1 ? 2 : 1;
  }
  
  if (currentPhase === 'ban-leader') {
    return currentTeam === 2 ? 1 : 2;
  }
  
  if (currentPhase === 'ban-souvenir-1') {
    return currentTeam === 1 ? 2 : 1;
  }
  
  if (currentPhase === 'pick-civilization') {
    return CIVILIZATION_PICK_ORDER[pickIndex + 1] || 1;
  }
  
  if (currentPhase === 'pick-leader') {
    return LEADER_PICK_ORDER[pickIndex + 1] || 2;
  }
  
  if (currentPhase === 'ban-souvenir-2') {
    return currentTeam === 2 ? 1 : 2;
  }
  
  return 1;
};

// Get the current phase display information
export const getPhaseInfo = (phase: DraftPhase): { 
  title: string; 
  description: string;
  itemType: ItemType | null;
  action: 'ban' | 'pick';
} => {
  switch (phase) {
    case 'ban-civilization':
      return { 
        title: 'Ban Civilization', 
        description: 'Each team bans 1 civilization',
        itemType: 'civilization',
        action: 'ban'
      };
    case 'ban-leader':
      return { 
        title: 'Ban Leader', 
        description: 'Each team bans 1 leader',
        itemType: 'leader',
        action: 'ban'
      };
    case 'ban-souvenir-1':
      return { 
        title: 'Ban Souvenir (Phase 1)', 
        description: 'Each team bans 1 souvenir',
        itemType: 'souvenir',
        action: 'ban'
      };
    case 'pick-civilization':
      return { 
        title: 'Pick Civilization', 
        description: 'Teams pick civilizations in order: 1-2-2-1-1-2-2-1',
        itemType: 'civilization',
        action: 'pick'
      };
    case 'pick-leader':
      return { 
        title: 'Pick Leader', 
        description: 'Teams pick leaders in order: 2-1-1-2-2-1-1-2',
        itemType: 'leader',
        action: 'pick'
      };
    case 'ban-souvenir-2':
      return { 
        title: 'Ban Souvenir (Phase 2)', 
        description: 'Each team bans 1 more souvenir',
        itemType: 'souvenir',
        action: 'ban'
      };
    case 'complete':
      return { 
        title: 'Draft Complete', 
        description: 'The draft process is complete',
        itemType: null,
        action: 'ban'
      };
  }
};

// Helper to determine if an item is banned
export const isItemBanned = (
  item: Civilization | Leader | Souvenir,
  teams: [Team, Team],
  itemType: ItemType,
  settings?: DraftSettings
): boolean => {
  // Check if item is auto-banned
  if (settings) {
    if (itemType === 'civilization' && settings.autoBannedCivilizations.includes(item.id)) {
      return true;
    }
    if (itemType === 'leader' && settings.autoBannedLeaders.includes(item.id)) {
      return true;
    }
    if (itemType === 'souvenir' && settings.autoBannedSouvenirs.includes(item.id)) {
      return true;
    }
  }

  // Check if item is banned by teams
  if (itemType === 'civilization') {
    return teams.some(team => 
      team.bannedCivilizations.some(civ => civ.id === item.id)
    );
  }
  if (itemType === 'leader') {
    return teams.some(team => 
      team.bannedLeaders.some(leader => leader.id === item.id)
    );
  }
  if (itemType === 'souvenir') {
    return teams.some(team => 
      team.bannedSouvenirs.some(souvenir => souvenir.id === item.id)
    );
  }
  return false;
};

// Helper to determine if an item is picked
export const isItemPicked = (
  item: Civilization | Leader,
  teams: [Team, Team],
  itemType: ItemType
): boolean => {
  if (itemType === 'civilization') {
    return teams.some(team => 
      team.pickedCivilizations.some(civ => civ.id === item.id)
    );
  }
  if (itemType === 'leader') {
    return teams.some(team => 
      team.pickedLeaders.some(leader => leader.id === item.id)
    );
  }
  return false;
};

// Get auto-banned items for display
export const getAutoBannedItems = (settings: DraftSettings): {
  civilizations: Civilization[];
  leaders: Leader[];
  souvenirs: Souvenir[];
} => {
  const autoBannedCivs = civilizationsData.civilizations.filter(
    civ => settings.autoBannedCivilizations.includes(civ.id)
  );
  
  const autoBannedLeaders = leadersData.leaders.filter(
    leader => settings.autoBannedLeaders.includes(leader.id)
  );
  
  const autoBannedSouvenirs = souvenirsData.souvenirs.filter(
    souvenir => settings.autoBannedSouvenirs.includes(souvenir.id)
  );

  return {
    civilizations: autoBannedCivs,
    leaders: autoBannedLeaders,
    souvenirs: autoBannedSouvenirs
  };
};