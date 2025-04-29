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
import { DraftSettings, ItemType } from '../../types';

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
  const [souvenirSearch, setSouvenirSearch] = useState('');

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
      alert('Team 2 link copied to clipboard!');
    }).catch(err => {
      console.error('Error copying link:', err);
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
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Draft in Progress</h1>
              <button
                onClick={handleShareDraft}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Share2 size={20} />
                Share Draft
              </button>
            </div>

            {/* Auto-banned items */}
            <div className="mb-8">
              <AutoBannedItems settings={settings} />
            </div>

            {/* Phase indicator */}
            <div className="mb-8">
              <PhaseIndicator
                currentPhase={currentPhase}
                currentTeam={currentTeam}
                pickIndex={pickIndex}
              />
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Team 1 */}
              <div className="lg:col-span-3">
                <TeamPanel
                  team={teams[0]}
                  isActive={currentTeam === 1 && !isComplete}
                  teamColor="red"
                />
              </div>

              {/* Items grid */}
              <div className="lg:col-span-6">
                {phaseInfo.itemType === 'souvenir' && (
                  <div className="mb-4">
                    <input
                      type="text"
                      value={souvenirSearch}
                      onChange={(e) => setSouvenirSearch(e.target.value)}
                      placeholder="Search souvenirs..."
                      className="w-full bg-gray-700 rounded px-4 py-2 text-white placeholder-gray-400"
                    />
                  </div>
                )}
                <ItemGrid
                  items={getItemsToDisplay().filter(item => 
                    phaseInfo.itemType !== 'souvenir' || 
                    item.name.toLowerCase().includes(souvenirSearch.toLowerCase())
                  )}
                  itemType={phaseInfo.itemType || 'civilization'}
                  teams={teams}
                  currentTeam={currentTeam}
                  action={phaseInfo.action}
                  onSelectItem={selectItem}
                  disabled={!canInteract}
                  settings={settings}
                />
              </div>

              {/* Team 2 */}
              <div className="lg:col-span-3">
                <TeamPanel
                  team={teams[1]}
                  isActive={currentTeam === 2 && !isComplete}
                  teamColor="blue"
                />
              </div>
            </div>

            {/* Confirmation modal */}
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