# 📘 Jobs-Insight

Jobs-Insight est un outil tout-en-un alimenté par l'intelligence artificielle pour générer des documents professionnels de haute qualité : CV, lettres de motivation, profils LinkedIn, et plus encore. Conçu pour les freelances, agences ou consultants en insertion professionnelle, il combine automatisation, design moderne et génération IA.

---

## 🚀 Fonctionnalités

* 🧠 Génération automatique de CV (avec ou sans photo)
* ✍️ Création de lettres de motivation personnalisées
* 💼 Optimisation de profils LinkedIn
* 🗂️ Mise en page et structuration professionnelle
* 🎯 Orientation professionnelle via prompts IA ciblés
* 📦 Téléchargement direct du contenu généré au format ZIP

---

## 🛠️ Stack technique

* **Frontend** : Vite + React + Tailwind CSS (hébergeable sur Netlify ou GitHub Pages)
* **Backend** : Python (FastAPI ou Flask) pour gérer la génération de contenu
* **IA** : Intégration locale de Flowise + modèles comme Mistral, Ollama, GPT-J, etc.
* **Automatisation** : Script `setup.sh` pour installer automatiquement tous les composants
* **Infrastructure cible** : VPS Ubuntu 22.04 (aucun stockage permanent requis)

---

## ⚙️ Installation (en 1 clic)

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/jobs-insight.git
   cd jobs-insight
   ```

2. Rendre exécutable le script d'installation :

   ```bash
   chmod +x setup.sh
   ```

3. Lancer l'installation complète :

   ```bash
   ./setup.sh
   ```

Cela installera :

* Flowise ([http://votre-ip:3001](http://votre-ip:3001))
* Backend ([http://votre-ip:8000](http://votre-ip:8000))
* Interface utilisateur ([http://votre-ip:3000](http://votre-ip:3000))

---

## 📁 Structure du projet

```
├── backend/          → Code de génération IA (CV, lettre, etc.)
├── frontend/         → Interface utilisateur React
├── scripts/          → (Optionnel) Autres scripts personnalisés
├── setup.sh          → Script d'installation automatique
└── README.md         → Ce fichier
```

---

## 🔐 Vie privée & sécurité

* ❌ Aucune donnée n’est conservée sur le serveur
* ✅ Tout contenu généré est temporaire, puis supprimé après téléchargement
* 🔒 Le système est prévu pour un usage privé sécurisé

---

## 🔄 À venir (feuille de route)

* 📬 Déclenchement par formulaire GitHub Pages (Formspree)
* 📤 Upload automatique des livrables dans un répertoire client
* 💎 Version premium avec plus de design et personnalisation
* 🧩 Modèle IA fine-tuné pour chaque livrable (CV, LinkedIn, lettre)

---

## 🤝 Contribuer

Ce projet est privé, mais vous pouvez le personnaliser pour vos propres besoins professionnels ou freelance.

---

## 📞 Contact

Créé par \[Votre Nom / Alias] — Pour toute question, contactez-moi via les plateformes freelance où je suis actif.

---

> "Créez des livrables professionnels en 1 clic — vendez de la qualité, pas du stress."

---

**Licence : usage privé uniquement**
