@echo off
start "" cmd /k "cd server && npm start"
start "" cmd /k "cd frontend-vue && npm run serve"
timeout /t 10
start http://localhost:8080
