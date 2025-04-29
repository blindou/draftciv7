import React from 'react';
import { DraftSettings } from '../../types';
import { getAutoBannedItems } from '../../utils/draftUtils';

interface AutoBannedItemsProps {
  settings: DraftSettings;
}

const AutoBannedItems: React.FC<AutoBannedItemsProps> = ({ settings }) => {
  const { civilizations, leaders, souvenirs } = getAutoBannedItems(settings);
  
  if (!civilizations.length && !leaders.length && !souvenirs.length) {
    return null;
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <h3 className="text-white font-bold text-lg mb-3">Auto-Banned Items</h3>
      
      {civilizations.length > 0 && (
        <div className="mb-3">
          <h4 className="text-red-400 font-semibold text-sm mb-1">Civilizations</h4>
          <div className="flex flex-wrap gap-1">
            {civilizations.map(civ => (
              <div 
                key={civ.id}
                className="bg-red-900 bg-opacity-30 border border-red-800 text-red-300 px-2 py-1 rounded text-xs"
              >
                {civ.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {leaders.length > 0 && (
        <div className="mb-3">
          <h4 className="text-red-400 font-semibold text-sm mb-1">Leaders</h4>
          <div className="flex flex-wrap gap-1">
            {leaders.map(leader => (
              <div 
                key={leader.id}
                className="bg-red-900 bg-opacity-30 border border-red-800 text-red-300 px-2 py-1 rounded text-xs"
              >
                {leader.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {souvenirs.length > 0 && (
        <div>
          <h4 className="text-red-400 font-semibold text-sm mb-1">Souvenirs</h4>
          <div className="flex flex-wrap gap-1">
            {souvenirs.map(souvenir => (
              <div 
                key={souvenir.id}
                className="bg-red-900 bg-opacity-30 border border-red-800 text-red-300 px-2 py-1 rounded text-xs"
              >
                {souvenir.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoBannedItems;