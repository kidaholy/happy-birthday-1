/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        text: "var(--color-text)",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
        romantic: ["var(--font-romantic)"],
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "heart-organic": "heart-beat-organic 2s ease-in-out infinite"
      },
    },
  },
  plugins: [],
}
