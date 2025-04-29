import { useState, useCallback, useEffect } from 'react';
import { 
  DraftState, 
  Civilization, 
  Leader, 
  Souvenir, 
  ItemType,
  DraftSettings,
  Draft
} from '../types';
import { 
  initializeDraftState, 
  getNextPhase, 
  getNextTeam,
  CIVILIZATION_PICK_ORDER,
  LEADER_PICK_ORDER
} from '../utils/draftUtils';
import { supabase } from '../lib/supabase';

export const useDraft = (settings: DraftSettings, draftId: string) => {
  const [draftState, setDraftState] = useState<DraftState>(initializeDraftState(settings));
  const [selectedItem, setSelectedItem] = useState<Civilization | Leader | Souvenir | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch initial state from Supabase
  useEffect(() => {
    const fetchDraftState = async () => {
      const { data, error } = await supabase
        .from('drafts')
        .select('state')
        .eq('id', draftId)
        .single();

      if (error) {
        console.error('Error fetching draft state:', error);
        return;
      }

      if (data?.state) {
        setDraftState(data.state);
      }
    };

    fetchDraftState();

    // Subscribe to changes
    console.log('Subscribing to draft changes for ID:', draftId);
    const channel = supabase.channel(`draft_${draftId}`);

    // Écouter les changements de la base de données
    channel
      .on('broadcast', { event: 'state_change' }, (payload) => {
        console.log('Broadcast received:', payload);
        if (payload.payload?.state) {
          console.log('Updating draft state from broadcast:', payload.payload.state);
          setDraftState(prevState => {
            console.log('Previous state:', prevState);
            console.log('New state from broadcast:', payload.payload.state);
            return payload.payload.state;
          });
        } else {
          console.log('No state in broadcast payload:', payload);
        }
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to draft changes');
        } else {
          console.error('Failed to subscribe to draft changes:', status);
        }
      });

    return () => {
      console.log('Unsubscribing from draft changes');
      channel.unsubscribe();
    };
  }, [draftId]);

  // Helper to update the draft state based on the current phase
  const updateDraftState = useCallback(async (
    item: Civilization | Leader | Souvenir,
    itemType: ItemType
  ) => {
    console.log('Updating draft state for item:', item);
    const newState = await new Promise<DraftState>((resolve) => {
      setDraftState(prevState => {
        const { currentPhase, currentTeam, pickIndex } = prevState;
        const teamIndex = currentTeam - 1;
        
        // Create deep clones of the teams and available items arrays
        const newTeams = JSON.parse(JSON.stringify(prevState.teams));
        let newAvailableCivilizations = [...prevState.availableCivilizations];
        let newAvailableLeaders = [...prevState.availableLeaders];
        let newAvailableSouvenirs = [...prevState.availableSouvenirs];
        
        // Update based on the current phase
        if (currentPhase === 'ban-civilization' || currentPhase === 'ban-leader' || 
            currentPhase === 'ban-souvenir-1' || currentPhase === 'ban-souvenir-2') {
          
          // Handle bans
          if (itemType === 'civilization') {
            const civilization = item as Civilization;
            newTeams[teamIndex].bannedCivilizations.push(civilization);
            newAvailableCivilizations = newAvailableCivilizations.filter(civ => civ.id !== civilization.id);
          } else if (itemType === 'leader') {
            const leader = item as Leader;
            newTeams[teamIndex].bannedLeaders.push(leader);
            newAvailableLeaders = newAvailableLeaders.filter(l => l.id !== leader.id);
          } else if (itemType === 'souvenir') {
            const souvenir = item as Souvenir;
            newTeams[teamIndex].bannedSouvenirs.push(souvenir);
            newAvailableSouvenirs = newAvailableSouvenirs.filter(s => s.id !== souvenir.id);
          }
        } else if (currentPhase === 'pick-civilization') {
          // Handle civilization picks
          const civilization = item as Civilization;
          newTeams[teamIndex].pickedCivilizations.push(civilization);
          newAvailableCivilizations = newAvailableCivilizations.filter(civ => civ.id !== civilization.id);
        } else if (currentPhase === 'pick-leader') {
          // Handle leader picks
          const leader = item as Leader;
          newTeams[teamIndex].pickedLeaders.push(leader);
          newAvailableLeaders = newAvailableLeaders.filter(l => l.id !== leader.id);
        }
        
        // Check if we need to move to the next phase
        let newPhase = currentPhase;
        let newTeam = currentTeam;
        let newPickIndex = pickIndex;
        
        // Phase transition logic
        if (currentPhase === 'ban-civilization' && newTeams[0].bannedCivilizations.length === 1 && newTeams[1].bannedCivilizations.length === 1) {
          newPhase = getNextPhase(currentPhase);
          newTeam = 2; // Team 2 starts the leader ban phase
        } else if (currentPhase === 'ban-leader' && newTeams[0].bannedLeaders.length === 1 && newTeams[1].bannedLeaders.length === 1) {
          newPhase = getNextPhase(currentPhase);
          newTeam = 1; // Team 1 starts the souvenir ban phase
        } else if (currentPhase === 'ban-souvenir-1' && newTeams[0].bannedSouvenirs.length === 1 && newTeams[1].bannedSouvenirs.length === 1) {
          newPhase = getNextPhase(currentPhase);
          newTeam = CIVILIZATION_PICK_ORDER[0]; // First team in civilization pick order
        } else if (currentPhase === 'pick-civilization') {
          newPickIndex++;
          if (newPickIndex >= CIVILIZATION_PICK_ORDER.length) {
            newPhase = getNextPhase(currentPhase);
            newPickIndex = 0;
            newTeam = LEADER_PICK_ORDER[0]; // First team in leader pick order
          } else {
            newTeam = CIVILIZATION_PICK_ORDER[newPickIndex];
          }
        } else if (currentPhase === 'pick-leader') {
          newPickIndex++;
          if (newPickIndex >= LEADER_PICK_ORDER.length) {
            newPhase = getNextPhase(currentPhase);
            newPickIndex = 0;
            newTeam = 2; // Team 2 starts the second souvenir ban phase
          } else {
            newTeam = LEADER_PICK_ORDER[newPickIndex];
          }
        } else if (currentPhase === 'ban-souvenir-2' && 
                  newTeams[0].bannedSouvenirs.length === 2 && 
                  newTeams[1].bannedSouvenirs.length === 2) {
          newPhase = getNextPhase(currentPhase);
          newTeam = 1; // Doesn't matter for complete phase
        } else {
          // Within the same phase, move to the next team
          newTeam = currentTeam === 1 ? 2 : 1;
        }
        
        const isComplete = newPhase === 'complete';
        
        const newState = {
          ...prevState,
          currentPhase: newPhase,
          currentTeam: newTeam,
          teams: newTeams,
          availableCivilizations: newAvailableCivilizations,
          availableLeaders: newAvailableLeaders,
          availableSouvenirs: newAvailableSouvenirs,
          pickIndex: newPickIndex,
          isComplete
        };

        console.log('New state calculated:', newState);
        resolve(newState);
        return newState;
      });
    });

    // Update Supabase
    console.log('Sending update to Supabase');
    const { error } = await supabase
      .from('drafts')
      .update({ state: newState })
      .eq('id', draftId);

    if (error) {
      console.error('Error updating draft state:', error);
      return;
    }
    console.log('Supabase update successful');

    // Force a refresh of the subscription
    console.log('Sending broadcast message');
    await supabase
      .channel(`draft_${draftId}`)
      .send({
        type: 'broadcast',
        event: 'state_change',
        payload: { state: newState }
      });
    console.log('Broadcast message sent');
    
    setSelectedItem(null);
    setShowConfirmation(false);
  }, [draftId]);
  
  // Select an item and show confirmation modal
  const selectItem = useCallback((item: Civilization | Leader | Souvenir) => {
    setSelectedItem(item);
    setShowConfirmation(true);
  }, []);
  
  // Confirm the selection
  const confirmSelection = useCallback(() => {
    if (!selectedItem) return;
    
    const { itemType } = getItemType(selectedItem);
    if (itemType) {
      updateDraftState(selectedItem, itemType);
    }
  }, [selectedItem, updateDraftState]);
  
  // Cancel the selection
  const cancelSelection = useCallback(() => {
    setSelectedItem(null);
    setShowConfirmation(false);
  }, []);
  
  // Reset the draft
  const resetDraft = useCallback(() => {
    setDraftState(initializeDraftState(settings));
    setSelectedItem(null);
    setShowConfirmation(false);
  }, [settings]);
  
  // Helper to identify item type
  const getItemType = (item: any): { itemType: ItemType | null } => {
    if (item && 'civilization' in item) {
      return { itemType: 'leader' };
    } else if (item && 'description' in item) {
      return { itemType: 'souvenir' };
    } else if (item) {
      return { itemType: 'civilization' };
    }
    return { itemType: null };
  };
  
  return {
    draftState,
    selectedItem,
    showConfirmation,
    selectItem,
    confirmSelection,
    cancelSelection,
    resetDraft
  };
};

export default useDraft;