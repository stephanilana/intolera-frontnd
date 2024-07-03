import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut1: {
          "0%": { opacity: "0" },
          "1%": { opacity: "100" },
          "25%": { opacity: "100" },
          "29%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        fadeInOut2: {
          "0%": { opacity: "0" },
          "24%": { opacity: "0" },
          "25%": { opacity: "100" },
          "50%": { opacity: "100" },
          "54%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        fadeInOut3: {
          "0%": { opacity: "0" },
          "49%": { opacity: "0" },
          "50%": { opacity: "100" },
          "75%": { opacity: "100" },
          "79%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        fadeInOut4: {
          "0%": { opacity: "0" },
          "74%": { opacity: "0" },
          "75%": { opacity: "100" },
          "99%": { opacity: "100" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        loginImage1: "fadeInOut1 20s ease-in-out infinite",
        loginImage2: "fadeInOut2 20s ease-in-out infinite",
        loginImage3: "fadeInOut3 20s ease-in-out infinite",
        loginImage4: "fadeInOut4 20s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Poppins"],
        arial: ["Poppins"],
      },
      colors: {
        "primary/100": "#e5f3ff",
        "primary/600": "#319Dff",
        "primary/700": "#0077e4",
        "success/100": "#CAFBEC",
        "success/500": "#10d096",
        "success/600": "#0DA678",
        "danger/100": "#ffe5ec",
        "danger/300": "#ffb1c7",
        "danger/600": "#ff316a",
        "danger/700": "#e4003f",
        "warning/100": "#FFF2Da",
        "warning/600": "#ffaa04",
        "warning/700": "#c28100",
        "info/100": "#caf6f9",
        "info/600": "#129199",
        "info/700": "#0e6d73",
        "gray/100": "#EEF0F4",
        "gray/200": "#DDE1E8",
        "gray/400": "#BAC4D1",
        "gray/500": "#586a84",
        "gray/600": "#7D8FA9",
        "gray/700": "#3B4758",
        "gray/800": "#404054",
        "gray/900": "#1B1A24",
        "gray/world": "#1D232C",
        "gray/dashboard": "#161B21",
        "gray/modal": "#4b5462",
        "gray/calculator": "#282634",
      },
      textShadow: {
        title: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
