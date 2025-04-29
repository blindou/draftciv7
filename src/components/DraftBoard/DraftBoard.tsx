import React, { useState, useEffect } from 'react';
import PhaseIndicator from './PhaseIndicator';
import TeamPanel from './TeamPanel';
import ItemGrid from './ItemGrid';
import ConfirmationModal from './ConfirmationModal';
import AutoBannedItems from './AutoBannedItems';
import DraftSummary from './DraftSummary';
import useDraft from '../../hooks/useDraft';
import { getPhaseInfo } from '../../utils/draftUtils';
import { Share2 } from 'lucide-react';
import { DraftSettings } from '../../types';

interface DraftBoardProps {
  settings: DraftSettings;
  draftId: string;
  teamNumber: number;
}

const DraftBoard: React.FC<DraftBoardProps> = ({ settings, draftId, teamNumber }) => {
  const {
    draftState,
    selectedItem,
    showConfirmation,
    selectItem,
    confirmSelection,
    cancelSelection,
    resetDraft
  } = useDraft(settings, draftId);
  
  const {
    currentPhase,
    currentTeam,
    teams,
    availableCivilizations,
    availableLeaders,
    availableSouvenirs,
    pickIndex,
    isComplete
  } = draftState;
  
  const [isTeam1Turn, setIsTeam1Turn] = useState(true);

  useEffect(() => {
    if (draftState) {
      setIsTeam1Turn(draftState.currentTeam === 1);
    }
  }, [draftState]);

  const canInteract = (teamNumber === 1 && isTeam1Turn) || 
                     (teamNumber === 2 && !isTeam1Turn);

  const handleShareDraft = () => {
    const team2Link = `${window.location.origin}/join/${draftId}?team=2`;
    navigator.clipboard.writeText(team2Link).then(() => {
      alert('Lien de l\'équipe 2 copié dans le presse-papier !');
    }).catch(err => {
      console.error('Erreur lors de la copie du lien:', err);
    });
  };
  
  // Get info about the current phase
  const phaseInfo = getPhaseInfo(currentPhase);
  
  // Get the appropriate items to display based on the current phase
  const getItemsToDisplay = () => {
    if (phaseInfo.itemType === 'civilization') {
      return availableCivilizations;
    } else if (phaseInfo.itemType === 'leader') {
      return availableLeaders;
    } else if (phaseInfo.itemType === 'souvenir') {
      return availableSouvenirs;
    }
    return [];
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {isComplete ? (
          <DraftSummary teams={teams} settings={settings} />
        ) : (
          <>
            {/* En-tête */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Draft en cours</h1>
              <button
                onClick={handleShareDraft}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Share2 size={20} />
                Partager la draft
              </button>
            </div>

            {/* Auto-banned items */}
            <div className="mb-8">
              <AutoBannedItems settings={settings} />
            </div>

            {/* Indicateur de phase */}
            <div className="mb-8">
              <PhaseIndicator
                currentPhase={currentPhase}
                currentTeam={currentTeam}
                pickIndex={pickIndex}
              />
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Équipe 1 */}
              <div className="lg:col-span-3">
                <TeamPanel
                  team={teams[0]}
                  isActive={currentTeam === 1 && !isComplete}
                  teamColor="red"
                />
              </div>

              {/* Grille d'items */}
              <div className="lg:col-span-6">
                <ItemGrid
                  items={getItemsToDisplay()}
                  itemType={phaseInfo.itemType || 'civilization'}
                  teams={teams}
                  currentTeam={currentTeam}
                  action={phaseInfo.action}
                  onSelectItem={selectItem}
                  disabled={!canInteract}
                  settings={settings}
                />
              </div>

              {/* Équipe 2 */}
              <div className="lg:col-span-3">
                <TeamPanel
                  team={teams[1]}
                  isActive={currentTeam === 2 && !isComplete}
                  teamColor="blue"
                />
              </div>
            </div>

            {/* Modal de confirmation */}
            <ConfirmationModal
              isOpen={showConfirmation}
              team={currentTeam}
              action={phaseInfo.action}
              item={selectedItem}
              onConfirm={confirmSelection}
              onCancel={cancelSelection}
              disabled={!canInteract}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DraftBoard;