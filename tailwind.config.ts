import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/***/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #956AFB 0%, #53AFED 100%)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateColumns: {
        'minmax': 'repeat(auto-fit, minmax(120px, 1fr))',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '3xl': '1820px',
      },
      colors: {
        gradient: 'linear-gradient(90deg, #956AFB 0%, #53AFED 100%)',
        background: '#FDFDFD',
        primary: '#956AFB',
        secondary: '#5B2591',
        tertiary: '#4B16C9',
        green: '#05B49D',
        blue: '#53AEEC',
        softBlue: '#3378DD',
        softPurple: '#7750D618',
        darkBlue: '#39558E',
        gray: '#E3E3E3',
        grayLight: '#F6F6F6',
        textPrimary: '#39474F',
        textSecondary: '#4A3D90',
        textTertiary: '#4A3D90',
        warning: '#FFAD0D',
        danger: '#F65252'
      },
      fontSize: {
        'xxs': '0.625rem',
      },
    },
  },
  plugins: [],
}
export default config
