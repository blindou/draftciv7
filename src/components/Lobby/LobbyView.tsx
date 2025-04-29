import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { DraftSettings, DraftFlow } from '../../types';
import { DRAFT_FLOWS } from '../../data/draftFlows';

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
      alert('Lien de l\'équipe 2 copié dans le presse-papier !');
    }).catch(err => {
      console.error('Erreur lors de la copie du lien:', err);
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
            Outil de draft pour Civilization 7
          </p>
        </div>

        {/* Description du fonctionnement */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Comment fonctionne la draft ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">Phase de Bannissement</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Chaque équipe bannit 1 civilisation</li>
                <li>Chaque équipe bannit 1 leader</li>
                <li>Chaque équipe bannit 1 souvenir (Phase 1)</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400">Phase de Sélection</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Sélection des civilisations : 1-2-2-1-1-2-2-1</li>
                <li>Sélection des leaders : 2-1-1-2-2-1-1-2</li>
                <li>Bannissement final de souvenirs (Phase 2)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Configuration des équipes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-red-400">Équipe 1</h3>
            <input
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 mb-4"
              placeholder="Nom de l'équipe 1"
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Équipe 2</h3>
            <input
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              className="w-full bg-gray-700 rounded px-4 py-2 mb-4"
              placeholder="Nom de l'équipe 2"
            />
          </div>
        </div>

        {/* Bouton de démarrage */}
        <div className="flex justify-center">
          <button
            onClick={handleStartDraft}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Démarrer la Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyView;