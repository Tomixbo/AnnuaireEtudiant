# Utiliser Caddy pour servir les fichiers statiques
FROM caddy:alpine

# Copier l'application buildée dans le dossier de Caddy
COPY . /usr/share/caddy

# Exposer le port 80
EXPOSE 5173

# Lancer Caddy automatiquement (pas besoin de config)
CMD ["caddy", "file-server", "--root", "/usr/share/caddy"]
