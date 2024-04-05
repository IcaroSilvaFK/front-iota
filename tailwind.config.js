/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        impar: {
          400: "#AE276F",
          500: "#5F1478",
        },
      },
    },
  },
  plugins: [],
};
