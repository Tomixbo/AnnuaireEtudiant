# Utiliser une image Node.js légère
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /frontend-lite

# Copier package.json et package-lock.json en premier pour optimiser le cache Docker
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers de l'application
COPY . .

# Exposer le port par défaut de Vite (5173)
EXPOSE 5173

# Lancer le serveur de développement avec accès réseau
CMD ["npm", "run", "serve"]
