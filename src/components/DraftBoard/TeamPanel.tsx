import React from 'react';
import { Team } from '../../types';

interface TeamPanelProps {
  team: Team;
  isActive: boolean;
  teamColor: 'red' | 'blue';
}

const TeamPanel: React.FC<TeamPanelProps> = ({ team, isActive, teamColor }) => {
  const colorClasses = teamColor === 'red' 
    ? 'border-red-500 bg-red-900/20' 
    : 'border-blue-500 bg-blue-900/20';

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses} ${isActive ? 'ring-2 ring-purple-500' : ''}`}>
      <h3 className="text-xl font-bold mb-4">{team.name}</h3>
      
      <div className="space-y-4">
        {/* Civilisations bannies */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Civilisations bannies</h4>
          <div className="flex flex-wrap gap-2">
            {team.bannedCivilizations.map((civ) => (
              <div key={civ.id} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {civ.name}
              </div>
            ))}
          </div>
        </div>

        {/* Leaders bannis */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Leaders bannis</h4>
          <div className="flex flex-wrap gap-2">
            {team.bannedLeaders.map((leader) => (
              <div key={leader.id} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {leader.name}
              </div>
            ))}
          </div>
        </div>

        {/* Souvenirs bannis */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Souvenirs bannis</h4>
          <div className="flex flex-wrap gap-2">
            {team.bannedSouvenirs.map((souvenir) => (
              <div key={souvenir.id} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {souvenir.name}
              </div>
            ))}
          </div>
        </div>

        {/* Civilisations choisies */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Civilisations choisies</h4>
          <div className="flex flex-wrap gap-2">
            {team.pickedCivilizations.map((civ) => (
              <div key={civ.id} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {civ.name}
              </div>
            ))}
          </div>
        </div>

        {/* Leaders choisis */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Leaders choisis</h4>
          <div className="flex flex-wrap gap-2">
            {team.pickedLeaders.map((leader) => (
              <div key={leader.id} className="bg-gray-800 px-2 py-1 rounded text-sm">
                {leader.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPanel;