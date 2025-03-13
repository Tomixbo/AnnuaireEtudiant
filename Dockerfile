FROM caddy:alpine

WORKDIR /usr/share/caddy
COPY . .

RUN apk add --no-cache curl

EXPOSE 5173

ENTRYPOINT ["/bin/sh", "-c", "SERVER_IP=$(curl -s ifconfig.me) && echo \"<script>window.ENV = { VITE_API_BASE_URL: 'http://$SERVER_IP:$BACKEND_PORT' };</script>\" >> /usr/share/caddy/index.html && exec caddy file-server --root /usr/share/caddy --listen :5173"]
