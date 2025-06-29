#!/bin/bash

echo " Iniciando NotesApp..."

# Navegar al backend
echo " Iniciando backend..."
cd backend || exit
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# Esperar unos segundos a que arranque el backend
sleep 10

# Navegar al frontend
echo " Iniciando frontend..."
cd frontend || exit
npm install
ng serve &
FRONTEND_PID=$!

# Manejo de salida
trap "echo ' Cerrando...'; kill $BACKEND_PID $FRONTEND_PID" SIGINT

# Mantener proceso activo hasta interrupción (Ctrl+C)
wait
