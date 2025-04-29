import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { DraftSettings, DraftFlow } from '../../types';
import { DRAFT_FLOWS } from '../../data/draftFlows';
import civilizationsData from '../../data/civilizations.json';
import leadersData from '../../data/leaders.json';
import souvenirsData from '../../data/souvenirs.json';

interface LobbyViewProps {
  onStartDraft: (settings: DraftSettings) => void;
  draftId?: string;
}

const LobbyView: React.FC<LobbyViewProps> = ({ onStartDraft, draftId }) => {
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [autoBannedCivilizations, setAutoBannedCivilizations] = useState<number[]>([]);
  const [autoBannedLeaders, setAutoBannedLeaders] = useState<number[]>([]);
  const [autoBannedSouvenirs, setAutoBannedSouvenirs] = useState<number[]>([]);
  const [souvenirSearch, setSouvenirSearch] = useState('');
  
  const handleStartDraft = () => {
    onStartDraft({
      team1Name,
      team2Name,
      autoBannedCivilizations,
      autoBannedLeaders,
      autoBannedSouvenirs,
      selectedFlow: DRAFT_FLOWS[0] // On garde le flow standard
    });
  };
  
  const handleShareDraft = () => {
    if (!draftId) return;
    
    const team2Link = `${window.location.origin}/join/${draftId}?team=2`;
    navigator.clipboard.writeText(team2Link).then(() => {
      alert('Team 2 link copied to clipboard!');
    }).catch(err => {
      console.error('Error copying link:', err);
    });
  };
  
  const toggleAutoBan = (
    id: number,
    currentBans: number[],
    setBans: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    if (currentBans.includes(id)) {
      setBans(currentBans.filter(bannedId => bannedId !== id));
    } else {
      setBans([...currentBans, id]);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
            Civilization 7 Draft Tool
          </h1>
          <p className="text-gray-400">
            Draft tool for Civilization 7
          </p>
        </div>

        {/* Description du fonctionnement */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">How does the draft work?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">Ban Phase</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Each team bans 1 civilization</li>
                <li>Each team bans 1 leader</li>
                <li>Each team bans 1 souvenir (Phase 1)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">Pick Phase</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Civilization picks: 1-2-2-1-1-2-2-1</li>
                <li>Leader picks: 2-1-1-2-2-1-1-2</li>
                <li>Final souvenir bans (Phase 2)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration des équipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-red-400">Team 1</h3>
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 mb-4"
              placeholder="Team 1 name"
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Team 2</h3>
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 mb-4"
              placeholder="Team 2 name"
            />
          </div>
        </div>

        {/* Panneau d'auto-ban */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">Auto-Bans</h3>
          <div className="space-y-6">
            {/* Civilisations */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-red-300">Civilizations</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {civilizationsData.civilizations.map(civ => (
                  <button
                    key={civ.id}
                    onClick={() => toggleAutoBan(civ.id, autoBannedCivilizations, setAutoBannedCivilizations)}
                    className={`group relative flex flex-col items-center p-2 rounded-lg transition-all ${
                      autoBannedCivilizations.includes(civ.id)
                        ? 'bg-red-900/50 border-2 border-red-800'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="w-16 h-16 mb-2 relative">
                      <img
                        src={civ.image}
                        alt={civ.name}
                        className="w-full h-full object-contain"
                      />
                      {autoBannedCivilizations.includes(civ.id) && (
                        <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                          <span className="text-red-100 text-2xl">✕</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center text-gray-300 group-hover:text-white">
                      {civ.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Leaders */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Leaders</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {leadersData.leaders.map(leader => (
                  <button
                    key={leader.id}
                    onClick={() => toggleAutoBan(leader.id, autoBannedLeaders, setAutoBannedLeaders)}
                    className={`group relative flex flex-col items-center p-2 rounded-lg transition-all ${
                      autoBannedLeaders.includes(leader.id)
                        ? 'bg-red-900/50 border-2 border-red-800'
                        : 'bg-gray-700/50 hover:bg-gray-600/50 border-2 border-transparent'
                    }`}
                  >
                    <div className="w-16 h-16 mb-2 relative">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-contain"
                      />
                      {autoBannedLeaders.includes(leader.id) && (
                        <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                          <span className="text-red-100 text-2xl">✕</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center text-gray-300 group-hover:text-white">
                      {leader.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Souvenirs */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-green-300">Souvenirs</h4>
              <div className="mb-4">
                <input
                  type="text"
                  value={souvenirSearch}
                  onChange={(e) => setSouvenirSearch(e.target.value)}
                  placeholder="Search souvenirs..."
                  className="w-full bg-gray-700 rounded px-4 py-2 text-white placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {souvenirsData.souvenirs
                  .filter(souvenir => 
                    souvenir.name.toLowerCase().includes(souvenirSearch.toLowerCase())
                  )
                  .map(souvenir => (
                    <button
                      key={souvenir.id}
                      onClick={() => toggleAutoBan(souvenir.id, autoBannedSouvenirs, setAutoBannedSouvenirs)}
                      className={`group relative flex flex-col items-center p-2 rounded-lg transition-all ${
                        autoBannedSouvenirs.includes(souvenir.id)
                          ? 'bg-red-900/50 border-2 border-red-800'
                          : 'bg-gray-700/50 hover:bg-gray-600/50 border-2 border-transparent'
                      }`}
                    >
                      <div className="w-16 h-16 mb-2 relative">
                        <img
                          src={souvenir.image}
                          alt={souvenir.name}
                          className="w-full h-full object-contain"
                        />
                        {autoBannedSouvenirs.includes(souvenir.id) && (
                          <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                            <span className="text-red-100 text-2xl">✕</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-center text-gray-300 group-hover:text-white">
                        {souvenir.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de démarrage */}
        <div className="flex justify-center">
          <button
            onClick={handleStartDraft}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyView;