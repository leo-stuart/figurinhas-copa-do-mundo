import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },
      colors: {
        gold: '#FDC32B',
        'green-accent': '#22C55E',
        'red-accent': '#F87171',
      },
    },
  },
  plugins: [],
}

export default config
