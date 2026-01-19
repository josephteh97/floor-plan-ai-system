#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}Floor Plan AI - Setup Script (Ubuntu/Linux)${NC}"
echo -e "${GREEN}==========================================${NC}"

# 1. System Dependencies Check
echo "Checking system dependencies..."

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: python3 is not installed.${NC}"
    echo "Please run: sudo apt update && sudo apt install python3 python3-pip python3-venv"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: node is not installed.${NC}"
    echo "Please install Node.js (v18+ recommended)."
    exit 1
fi

# 2. Python Environment Setup
echo -e "\n${GREEN}Setting up Backend (Python)...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
# Upgrade pip first
pip install --upgrade pip
# Install torch first (heavy dependency)
# Note: For production with CUDA, user should install specific torch version
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt

cd ..

# 3. Frontend Setup
echo -e "\n${GREEN}Setting up Frontend (Node.js)...${NC}"
cd frontend
echo "Installing Node dependencies..."
npm install
cd ..

# 4. Environment Variables
if [ ! -f .env ]; then
    echo -e "\n${GREEN}Creating .env file...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
    else
        echo "ANTHROPIC_API_KEY=your_key_here" > .env
        echo "APP_ENV=development" >> .env
    fi
    echo "Please edit .env file with your API keys."
fi

# 5. Make run script executable
chmod +x run.sh

echo -e "\n${GREEN}==========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}==========================================${NC}"
echo -e "To start the application, run:"
echo -e "  ./run.sh"
