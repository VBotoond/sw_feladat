Installálás:

npm create vite@latest
(React/JavaScript)

cd sw_feladat
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install nanoid
npm install @heroicons/react

tailwind.config.js:
...
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
...

(App.css, index.css és hivatkozásai törölve, majd létrehozzuk az src/main.css file-t.)
src/main.css:

@tailwind base;
@tailwind components;
@tailwind utilities;
...

npm run dev
