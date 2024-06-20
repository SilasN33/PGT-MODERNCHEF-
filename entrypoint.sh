#!/bin/sh

# Inicia o backend
node /app/modernchef/backend/server.js &

# Mantém o container ativo
tail -f /dev/null