#!/bin/bash

# ========================
# 🚀 Jobs-Insight Setup Script
# Compatible Ubuntu 22.04
# ========================

echo "🔧 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installation de Node.js, npm, git, python3, pip..."
sudo apt install -y nodejs npm git python3 python3-pip

echo "🛠️ Installation de Docker..."
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu   $(lsb_release -cs) stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER

echo "🔁 Redémarrer la session après l'installation de Docker si demandé."

# Cloner Flowise
echo "🔄 Clonage de Flowise..."
git clone https://github.com/FlowiseAI/Flowise.git flowise
cd flowise
echo "📦 Installation des dépendances Flowise..."
npm install
npm run build
cd ..

# Configuration du backend
echo "🧠 Installation des dépendances Python pour le backend..."
cd backend
pip install -r requirements.txt
cd ..

# Lancement Flowise en arrière-plan
echo "🚀 Lancement de Flowise sur le port 3001..."
nohup node flowise/dist/index.js &

# Lancement du backend en arrière-plan
echo "🚀 Lancement du backend sur le port 8000..."
nohup python3 backend/main.py &

# Configuration et lancement du frontend
echo "🌐 Installation des dépendances frontend..."
cd frontend
npm install
echo "🚀 Lancement du frontend (port 3000)..."
nohup npm run dev -- --port 3000 &

cd ..

echo ""
echo "✅ Tous les services sont lancés !"
echo "🌐 Interface Web    : http://<votre-ip>:3000"
echo "🧠 Flowise         : http://<votre-ip>:3001"
echo "⚙️ Backend         : http://<votre-ip>:8000"
echo ""
echo "🔒 Aucun fichier n'est stocké. Génération => Téléchargement => Suppression automatique."
