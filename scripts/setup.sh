#!/bin/bash

# Installer les paquets nécessaires
sudo apt update && sudo apt install -y git python3 python3-pip nodejs npm unzip

# Installer Flowise
git clone https://github.com/FlowiseAI/Flowise.git
cd Flowise
npm install && npm run build
nohup npm start &
cd ..

# Installer backend
cd backend
pip install -r requirements.txt
nohup uvicorn main:app --host 0.0.0.0 --port 8000 &
cd ..

# Lancer le frontend localement (ou le déployer sur GitHub Pages)
cd frontend
nohup python3 -m http.server 3000 &
cd ..

echo '✅ Installation terminée'
echo '🌐 Interface web : http://votre-ip:3000'
echo '🧠 Flowise : http://votre-ip:3001'
echo '⚙️ Backend : http://votre-ip:8000'