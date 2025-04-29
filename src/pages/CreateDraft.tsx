import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LobbyView from '../components/Lobby/LobbyView';
import { DraftSettings, ItemType, DraftPhase, ActionType } from '../types';
import { supabase } from '../lib/supabase';
import { initializeDraftState } from '../utils/draftUtils';
import { DRAFT_FLOWS } from '../data/draftFlows';
import civilizationsData from '../data/civilizations.json';
import leadersData from '../data/leaders.json';
import souvenirsData from '../data/souvenirs.json';

const DEFAULT_FLOW = {
  name: 'Standard Flow',
  description: 'Standard draft flow with civilization and leader picks',
  steps: [
    { type: 'civilization' as ItemType, action: 'ban' as ActionType, team: 1, phase: 'ban-civilization' as DraftPhase },
    { type: 'civilization' as ItemType, action: 'ban' as ActionType, team: 2, phase: 'ban-civilization' as DraftPhase },
    { type: 'leader' as ItemType, action: 'ban' as ActionType, team: 1, phase: 'ban-leader' as DraftPhase },
    { type: 'leader' as ItemType, action: 'ban' as ActionType, team: 2, phase: 'ban-leader' as DraftPhase },
    { type: 'souvenir' as ItemType, action: 'ban' as ActionType, team: 1, phase: 'ban-souvenir-1' as DraftPhase },
    { type: 'souvenir' as ItemType, action: 'ban' as ActionType, team: 2, phase: 'ban-souvenir-1' as DraftPhase },
    { type: 'civilization' as ItemType, action: 'pick' as ActionType, team: 1, phase: 'pick-civilization' as DraftPhase },
    { type: 'civilization' as ItemType, action: 'pick' as ActionType, team: 2, phase: 'pick-civilization' as DraftPhase },
    { type: 'civilization' as ItemType, action: 'pick' as ActionType, team: 2, phase: 'pick-civilization' as DraftPhase },
    { type: 'civilization' as ItemType, action: 'pick' as ActionType, team: 1, phase: 'pick-civilization' as DraftPhase },
    { type: 'leader' as ItemType, action: 'pick' as ActionType, team: 1, phase: 'pick-leader' as DraftPhase },
    { type: 'leader' as ItemType, action: 'pick' as ActionType, team: 2, phase: 'pick-leader' as DraftPhase },
    { type: 'leader' as ItemType, action: 'pick' as ActionType, team: 2, phase: 'pick-leader' as DraftPhase },
    { type: 'leader' as ItemType, action: 'pick' as ActionType, team: 1, phase: 'pick-leader' as DraftPhase },
    { type: 'souvenir' as ItemType, action: 'ban' as ActionType, team: 1, phase: 'ban-souvenir-2' as DraftPhase },
    { type: 'souvenir' as ItemType, action: 'ban' as ActionType, team: 2, phase: 'ban-souvenir-2' as DraftPhase }
  ]
};

const CreateDraft = () => {
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState<string | undefined>(undefined);

  const handleStartDraft = async (settings: DraftSettings) => {
    try {
      const draftSettings: DraftSettings = {
        ...settings,
        selectedFlow: DEFAULT_FLOW
      };

      const initialState = {
        currentPhase: 'ban-civilization' as DraftPhase,
        currentTeam: 1,
        teams: [
          { name: settings.team1Name, bannedCivilizations: [], bannedLeaders: [], bannedSouvenirs: [], pickedCivilizations: [], pickedLeaders: [] },
          { name: settings.team2Name, bannedCivilizations: [], bannedLeaders: [], bannedSouvenirs: [], pickedCivilizations: [], pickedLeaders: [] }
        ],
        availableCivilizations: civilizationsData.civilizations,
        availableLeaders: leadersData.leaders,
        availableSouvenirs: souvenirsData.souvenirs,
        pickIndex: 0,
        isComplete: false
      };

      const { data, error } = await supabase
        .from('drafts')
        .insert([
          {
            settings: draftSettings,
            state: initialState
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setDraftId(data.id);
      navigate(`/draft/${data.id}?team=1`);
    } catch (error) {
      console.error('Error creating draft:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <LobbyView onStartDraft={handleStartDraft} draftId={draftId} />
    </div>
  );
};

export default CreateDraft;