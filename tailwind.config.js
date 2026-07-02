/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Rajdhani", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        carbon: "#080a0d",
        gunmetal: "#121820",
        steel: "#8da3b3",
        arc: "#00d5ff",
        reactor: "#f7c948",
        danger: "#ef4444",
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 213, 255, 0.18)",
        insetPanel: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
