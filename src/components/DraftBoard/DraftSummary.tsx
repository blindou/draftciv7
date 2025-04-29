import React from 'react';
import { Team, DraftSettings } from '../../types';
import { getAutoBannedItems } from '../../utils/draftUtils';

interface DraftSummaryProps {
  teams: [Team, Team];
  settings: DraftSettings;
}

const DraftSummary: React.FC<DraftSummaryProps> = ({ teams, settings }) => {
  const [team1, team2] = teams;
  const autoBannedItems = getAutoBannedItems(settings);

  const renderItemList = (items: any[], type: string) => {
    if (!items.length) return null;
    
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 capitalize">{type}s</h4>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <div 
              key={item.id}
              className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Récapitulatif de la Draft</h2>
      
      {/* Auto-banned items */}
      {Object.values(autoBannedItems).some(items => items.length > 0) && (
        <div className="mb-8 p-4 bg-red-900 bg-opacity-30 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-red-300">Items Auto-Bannis</h3>
          {renderItemList(autoBannedItems.civilizations, 'civilization')}
          {renderItemList(autoBannedItems.leaders, 'leader')}
          {renderItemList(autoBannedItems.souvenirs, 'souvenir')}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Team 1 */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-red-400">{team1.name}</h3>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-red-300">Bannis</h4>
            {renderItemList(team1.bannedCivilizations, 'civilization')}
            {renderItemList(team1.bannedLeaders, 'leader')}
            {renderItemList(team1.bannedSouvenirs, 'souvenir')}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 text-green-300">Sélectionnés</h4>
            {renderItemList(team1.pickedCivilizations, 'civilization')}
            {renderItemList(team1.pickedLeaders, 'leader')}
          </div>
        </div>

        {/* Team 2 */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">{team2.name}</h3>
          
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-300">Bannis</h4>
            {renderItemList(team2.bannedCivilizations, 'civilization')}
            {renderItemList(team2.bannedLeaders, 'leader')}
            {renderItemList(team2.bannedSouvenirs, 'souvenir')}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 text-green-300">Sélectionnés</h4>
            {renderItemList(team2.pickedCivilizations, 'civilization')}
            {renderItemList(team2.pickedLeaders, 'leader')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftSummary; 