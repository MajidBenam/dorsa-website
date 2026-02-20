import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cc',
          300: '#96c03a',
          400: '#7ba82f',
          500: '#96c03a',
          600: '#7ba82f',
          700: '#5f8a24',
          800: '#4a6c1c',
          900: '#3a5516',
        },
        accent: {
          50: '#e6f7fb',
          100: '#b3e8f3',
          200: '#80d9eb',
          300: '#4dcae3',
          400: '#1ab8db',
          500: '#00aecc',
          600: '#008ba3',
          700: '#00687a',
          800: '#004552',
          900: '#002229',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, #96c03a 0%, #00aecc 30%)',
        'gradient-primary-full': 'linear-gradient(45deg, #96c03a 0%, #00aecc 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
