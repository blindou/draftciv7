# Civilization 7 Draft Tool

Un outil de draft pour Civilization 7 qui permet aux équipes de bannir et sélectionner des civilisations, leaders et souvenirs de manière équitable.

## Fonctionnalités

- Draft en temps réel pour deux équipes
- Phases de bannissement et de sélection
- Support pour les civilisations, leaders et souvenirs
- Interface utilisateur intuitive
- Synchronisation en temps réel via Supabase

## Comment ça marche

### Phase de Bannissement
- Chaque équipe bannit 1 civilisation
- Chaque équipe bannit 1 leader
- Chaque équipe bannit 1 souvenir (Phase 1)

### Phase de Sélection
- Sélection des civilisations : 1-2-2-1-1-2-2-1
- Sélection des leaders : 2-1-1-2-2-1-1-2
- Bannissement final de souvenirs (Phase 2)

## Technologies utilisées

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/civ7-draft-tool.git
cd civ7-draft-tool
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec vos variables d'environnement Supabase :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

4. Lancez l'application en mode développement :
```bash
npm run dev
```

## Déploiement

L'application peut être déployée sur Vercel, Netlify ou tout autre service d'hébergement statique.

## Licence

MIT 