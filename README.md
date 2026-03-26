# NewKet 🛒

Plateforme e-commerce moderne — Architecture Monorepo Fullstack.

## Structure du Projet

```
newket/
├── frontend/          # Application web (Vite + Tailwind)
│   ├── src/
│   │   ├── assets/    # CSS, images, fonts
│   │   ├── components/# Composants HTML réutilisables
│   │   ├── pages/     # Pages du site + admin/
│   │   └── services/  # Logique JS (auth, API, etc.)
│   └── public/        # Fichiers statiques (manifest, SW)
│
├── backend/           # API Node.js (Express)
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── models/
│       ├── middlewares/
│       └── server.js
│
├── database/          # Supabase (migrations, fonctions)
│   └── supabase/
│
└── docs/              # Documentation projet
```

## Démarrage rapide

```bash
# Installer toutes les dépendances
npm run install:all

# Lancer le frontend
npm run dev:frontend

# Lancer le backend
npm run dev:backend
```

## Technologies

- **Frontend** : HTML, CSS, Tailwind, Vite
- **Backend** : Node.js, Express
- **Base de données** : Supabase (PostgreSQL)
- **Déploiement** : Vercel (frontend)
