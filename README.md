npm create vite@latest annuaire
cd annuaire
npm install

npm install axios
npm install tailwindcss@next @tailwindcss/vite@next

add in vite config:
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});


add in css : @import "tailwindcss";

npm run dev
