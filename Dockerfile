# Utiliser l'image Caddy officielle
FROM caddy:alpine

# Copier les fichiers statiques dans le dossier de Caddy
COPY . /usr/share/caddy

# Exposer le port 5173
EXPOSE 5173

RUN echo '<script>window.ENV = { VITE_API_BASE_URL: "'${VITE_API_BASE_URL}'" };</script>' >> /usr/share/caddy/index.html

# Lancer Caddy directement avec les arguments de configuration
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":5173"]
