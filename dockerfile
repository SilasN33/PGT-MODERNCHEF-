# Etapa de build do front-end
FROM node:14 AS build

WORKDIR /app

# Copia os arquivos de dependências e instala
COPY modernchef/package*.json ./modernchef/
RUN cd modernchef && npm install

# Copia todo o projeto e executa o build do front-end
COPY modernchef/ ./modernchef/
RUN cd modernchef && npm run build

# Imagem de produção
FROM node:14

WORKDIR /app

# Copia os arquivos de dependências do backend e instala
COPY modernchef/backend/package*.json ./modernchef/backend/
RUN cd modernchef/backend && npm install

# Copia o backend
COPY modernchef/backend/ ./modernchef/backend/

# Copia o build do front-end para a pasta de estáticos do backend
COPY --from=build /app/modernchef/build ./modernchef/backend/public

# Expõe a porta para o back-end
EXPOSE 3000

# Script de entrada para iniciar ambos os serviços
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
