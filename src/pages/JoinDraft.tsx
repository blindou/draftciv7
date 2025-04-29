import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Draft, DraftSettings } from '../types';
import DraftBoard from '../components/DraftBoard/DraftBoard';

const JoinDraft = () => {
  const { draftId } = useParams<{ draftId: string }>();
  const [searchParams] = useSearchParams();
  const [settings, setSettings] = useState<DraftSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [teamNumber, setTeamNumber] = useState<number>(2); // Par défaut, l'équipe 2

  useEffect(() => {
    const team = searchParams.get('team');
    if (team) {
      setTeamNumber(parseInt(team, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!draftId) return;

      const { data, error } = await supabase
        .from('drafts')
        .select('settings')
        .eq('id', draftId)
        .single();

      if (error) {
        setError('Erreur lors de la récupération de la draft');
        return;
      }

      setSettings(data.settings);
    };

    fetchDraft();
  }, [draftId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!settings) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rejoindre la Draft</h1>
      <p className="mb-4">Vous êtes dans l'équipe {teamNumber}</p>
      <DraftBoard 
        draftId={draftId!} 
        settings={settings}
        teamNumber={teamNumber}
      />
    </div>
  );
};

export default JoinDraft;