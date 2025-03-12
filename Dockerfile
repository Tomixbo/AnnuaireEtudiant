# Utiliser l'image Caddy officielle
FROM caddy:alpine

# Copier les fichiers statiques dans le dossier de Caddy
COPY . /usr/share/caddy

# Exposer le port 5173
EXPOSE 5173

# Lancer Caddy directement avec les arguments de configuration
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":5173"]
