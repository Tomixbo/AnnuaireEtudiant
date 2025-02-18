## Frontend service : créer avec ReactJS+Vite

Initialisation :
```
npm create vite@latest annuaire
cd annuaire
npm install
```

Installation des librairies :
```
npm install axios
npm install tailwindcss@next @tailwindcss/vite@next
```

Ajout de tailwind :
```
// index.css
@import "tailwindcss";
```
```
// vite.config.js
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
```

Lancer l'application React:
```
npm run dev
```