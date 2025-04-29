# Civilization 7 Draft Tool

A draft tool for Civilization 7 that allows teams to ban and pick civilizations, leaders, and souvenirs in a structured way.

## Features

- Team-based draft system
- Auto-ban system for civilizations, leaders, and souvenirs
- Real-time draft progress tracking
- Shareable draft links
- Responsive design

## Draft Phases

1. Ban Phase
   - Each team bans civilizations, leaders, and souvenirs
   - Teams take turns banning items

2. Selection Phase
   - Teams pick civilizations, leaders, and souvenirs
   - Teams take turns picking items

3. Final Ban Phase
   - Teams can ban additional items
   - Teams take turns banning items

## How to Use

1. Create a draft by entering team names
2. Share the draft link with your team
3. Follow the draft phases to ban and pick items
4. Complete the draft and start your game

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Supabase

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