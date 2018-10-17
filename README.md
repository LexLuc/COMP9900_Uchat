# COMP9900_Uchat
Team work for 18s2, COMP9900

# Prerequisite
`Python3.6`, `npm`

# Quick Start
## Python environment configuration
Before install these Python packages, we strongly encourage you use `virtualenv` 
in case of mess your base Python environment:)
```bash
# Install required Python packages:
pip install -r "requirements.txt"
```
## Start Daily Chat Server
```bash
# Move to daily chat part:
cd aiml-daily_chat

# Run daily chat server:
python dailychat_backendapi.py
# this server will run at http://localhost:8080
```

## Start Wechat API
```bash
# Move to Wechat API part:
cd ../aiml-Wechat

# Run Wechat server:
python wechatAPI.py
```
Then scan the QR code using your Wechat APP

## Start Web part:
``` bash
# Move to Web part:
cd ../aiml-WEB

# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
