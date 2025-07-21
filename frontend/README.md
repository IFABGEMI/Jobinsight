# CV Generator Pro

## 🎯 Description

CV Generator Pro est une application web moderne de génération de CV professionnels. Construite avec React, TypeScript et Tailwind CSS, elle offre une interface intuitive pour créer des CV adaptés à différents secteurs d'activité.

## ✨ Fonctionnalités

### 🎨 Interface moderne et responsive
- Design professionnel avec thème indigo/gris
- Interface adaptée mobile et bureau
- Animations et transitions fluides
- Composants UI modernes avec shadcn/ui

### 📝 Formulaire complet
- **Informations personnelles** : Nom, email, poste visé, secteur
- **Parcours académique** : Formation et diplômes
- **Expérience professionnelle** : Postes et responsabilités
- **Compétences techniques** : Technologies et outils maîtrisés
- **Langues** : Niveau de maîtrise
- **Objectif professionnel** : Vision de carrière
- **Style de rendu** : 5 styles adaptés aux secteurs
  - 🎭 Sobre - Élégant et professionnel
  - 🎨 Design - Moderne et créatif  
  - 🚀 Startup - Dynamique et innovant
  - 🎓 Académique - Structuré et formel
  - 💡 Créatif - Artistique et original

### 📦 Génération multi-format
- **PDF** : Format professionnel pour candidatures
- **DOCX** : Version éditable
- **HTML** : Pour web et email
- **ZIP** : Package complet téléchargeable

### 🔍 Aperçu en temps réel
- Prévisualisation des fichiers générés
- Conseils de rédaction professionnels
- Suivi du statut de génération

## 🛠 Technologies utilisées

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling moderne
- **Vite** - Build tool rapide
- **Wouter** - Routing léger
- **React Hook Form** - Gestion des formulaires
- **TanStack Query** - State management serveur
- **Radix UI** - Composants accessibles
- **shadcn/ui** - Design system

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **TypeScript** - Type safety
- **Drizzle ORM** - ORM moderne
- **Zod** - Validation des schémas
- **Archiver** - Génération de ZIP

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd cv-generator-pro

# Installer les dépendances
npm install

# Démarrer l'application
npm run dev
```

L'application sera accessible sur `http://localhost:5000`

## 📁 Structure du projet

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks personnalisés
│   │   └── lib/           # Utilitaires et configurations
├── server/                # Backend Express
│   ├── routes.ts         # Définition des routes API
│   ├── storage.ts        # Couche d'accès aux données
│   └── index.ts          # Point d'entrée serveur
├── shared/               # Types et schémas partagés
│   └── schema.ts         # Schémas Drizzle et validation Zod
└── components.json       # Configuration shadcn/ui
```

## 🎯 Utilisation

1. **Remplir le formulaire** : Complétez toutes les sections avec vos informations
2. **Choisir un style** : Sélectionnez le style adapté à votre secteur
3. **Générer le CV** : Cliquez sur "Générer mon CV professionnel"
4. **Télécharger** : Récupérez votre package ZIP avec tous les formats

## 🎨 Styles disponibles

### 🎭 Sobre
Parfait pour les secteurs traditionnels : finance, droit, consulting
- Design épuré et professionnel
- Typographie classique
- Couleurs neutres

### 🎨 Design  
Idéal pour les métiers créatifs : design, architecture, communication
- Elements visuels modernes
- Mise en page innovante
- Couleurs dynamiques

### 🚀 Startup
Adapté aux environnements tech et innovation
- Design dynamique
- Accent sur les compétences techniques
- Style moderne et accessible

### 🎓 Académique
Pour la recherche, l'enseignement, la science
- Structure formelle
- Mise en avant des publications
- Présentation rigoureuse

### 💡 Créatif
Pour les métiers artistiques et créatifs
- Design original
- Portfolio intégré
- Liberté créative

## 🔧 Configuration

### Variables d'environnement
```env
DATABASE_URL=your_database_url  # Optionnel, utilise la mémoire par défaut
NODE_ENV=development
```

### Customisation
- Couleurs : Modifier `client/src/index.css`
- Composants : Utiliser `npx shadcn-ui add [component]`
- Styles CV : Étendre les options dans `cv-form.tsx`

## 📝 API Endpoints

### POST `/api/generate`
Génère un nouveau CV

**Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "targetPosition": "string",
  "industry": "string",
  "education": "string", 
  "experience": "string",
  "skills": "string",
  "languages": "string",
  "objective": "string",
  "style": "sober|design|startup|academic|creative"
}
```

**Response:**
```json
{
  "id": "string",
  "summary": "string",
  "files": {
    "pdf": "filename.pdf",
    "docx": "filename.docx", 
    "html": "filename.html"
  }
}
```

### GET `/api/download/:id`
Télécharge le package ZIP du CV

**Response:** Fichier ZIP contenant les 3 formats

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [React](https://reactjs.org/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Lucide](https://lucide.dev/) - Icônes

---

**CV Generator Pro** - Créez votre CV professionnel en quelques minutes ✨