import React from 'react';
import { DraftPhase } from '../../types';
import { getPhaseInfo } from '../../utils/draftUtils';

interface PhaseIndicatorProps {
  currentPhase: DraftPhase;
  currentTeam: number;
  pickIndex: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ 
  currentPhase, 
  currentTeam,
  pickIndex
}) => {
  const phaseInfo = getPhaseInfo(currentPhase);
  
  // Phase colors
  const getPhaseColor = (phase: DraftPhase): string => {
    switch (phase) {
      case 'ban-civilization':
      case 'ban-leader':
      case 'ban-souvenir-1':
      case 'ban-souvenir-2':
        return 'bg-red-600';
      case 'pick-civilization':
      case 'pick-leader':
        return 'bg-emerald-600';
      case 'complete':
        return 'bg-purple-600';
      default:
        return 'bg-blue-600';
    }
  };

  const phases: DraftPhase[] = [
    'ban-civilization',
    'ban-leader',
    'ban-souvenir-1',
    'pick-civilization',
    'pick-leader',
    'ban-souvenir-2',
    'complete'
  ];

  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          {phaseInfo.title}
        </h2>
        <p className="text-gray-300 mb-4">
          {phaseInfo.description}
        </p>
        
        {currentPhase !== 'complete' && (
          <div className="flex items-center mb-4">
            <div 
              className={`w-4 h-4 rounded-full mr-2 ${
                currentTeam === 1 ? 'bg-blue-500' : 'bg-red-500'
              }`}
            />
            <p className="text-white font-semibold">
              Team {currentTeam}'s turn
            </p>
          </div>
        )}
        
        {(currentPhase === 'pick-civilization' || currentPhase === 'pick-leader') && (
          <div className="text-gray-300 text-sm">
            Pick {pickIndex + 1} of 8
          </div>
        )}
      </div>
      
      {/* Phase progress bar */}
      <div className="flex w-full h-2">
        {phases.map((phase, index) => (
          <div 
            key={phase} 
            className={`h-full ${getPhaseColor(phase)} transition-all duration-300 ${
              phases.indexOf(currentPhase) >= index ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ width: `${100 / phases.length}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default PhaseIndicator;