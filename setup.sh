#!/bin/bash

echo "🔧 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

echo "🔧 Installation de Node.js, npm et autres dépendances..."
sudo apt install -y nodejs npm git unzip curl python3 python3-pip python3-venv

echo "🔧 Installation de Docker (pour Ollama)..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

echo "🐳 Lancement d'Ollama avec Mistral..."
docker run -d --name ollama -p 11434:11434 ollama/ollama
sleep 5
docker exec -it ollama ollama run mistral

echo "🧠 Clonage de Flowise..."
git clone https://github.com/FlowiseAI/Flowise.git
cd Flowise
npm install
npm run build

echo "🌐 Démarrage de Flowise en arrière-plan..."
nohup npm run start > ../flowise.log 2>&1 & 
cd ..

echo "🦾 Installation du backend Python (FastAPI)..."
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn python-multipart aiofiles python-docx fpdf
deactivate
cd ..

echo "✅ Installation terminée !"
echo "🌐 Interface web : http://<votre-ip>:3000"
echo "🧠 Flowise : http://<votre-ip>:3001"
echo "⚙️ Backend : http://<votre-ip>:8000"
