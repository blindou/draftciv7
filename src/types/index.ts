export interface Team {
  id: number;
  name: string;
  bannedCivilizations: Civilization[];
  bannedLeaders: Leader[];
  bannedSouvenirs: Souvenir[];
  pickedCivilizations: Civilization[];
  pickedLeaders: Leader[];
}

export interface Civilization {
  id: number;
  name: string;
  image: string;
}

export interface Leader {
  id: number;
  name: string;
  image: string;
  civilization?: number;
}

export interface Souvenir {
  id: number;
  name: string;
  image: string;
  description: string;
}

export type ItemType = 'civilization' | 'leader' | 'souvenir';
export type ActionType = 'ban' | 'pick';
export type DraftPhase = 'ban-civilization' | 'ban-leader' | 'ban-souvenir-1' | 'ban-souvenir-2' | 'pick-civilization' | 'pick-leader' | 'complete';

export interface DraftStep {
  type: ItemType;
  action: ActionType;
  team: number;
  phase: DraftPhase;
}

export interface DraftFlow {
  name: string;
  description: string;
  steps: DraftStep[];
}

export interface DraftSettings {
  team1Name: string;
  team2Name: string;
  autoBannedCivilizations: number[];
  autoBannedLeaders: number[];
  autoBannedSouvenirs: number[];
  selectedFlow: DraftFlow;
}

export interface Draft {
  id: string;
  created_at: string;
  settings: DraftSettings;
  state: DraftState;
  team1_connected: boolean;
  team2_connected: boolean;
}

export interface DraftState {
  currentPhase: DraftPhase;
  currentTeam: number;
  teams: [Team, Team];
  availableCivilizations: Civilization[];
  availableLeaders: Leader[];
  availableSouvenirs: Souvenir[];
  currentStepIndex: number;
  pickIndex: number;
  isComplete: boolean;
  settings: DraftSettings;
}