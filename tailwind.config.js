module.exports = {
  important: true,
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './_posts/**/*.md'],
  darkMode: false,
  theme: {
    screens: {
      ssm: { max: '639px' },
      // => @media (max-width:639px)
      sm: { min: '640px', max: '767px' },
      // => @media (min-width: 640px) { ... }

      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px) { ... }

      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px) { ... }

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px) { ... }

      '2xl': { min: '1536px', max: '1919px' },
      // => @media (min-width: 1536px) { ... }
      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      custom: '0 10px 15px -3px #76dce6, 0 4px 6px -2px #76dce6',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto'],
      },
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        lightBlack: '#111111bf',
        lightGray: '#333333',
        darkRed: '#E50914',
        grayLightText: '#B3B3B3',
        grayText: '#737373',
        mainColor: '#ADD9E6',
        lightGreen: '#36CB83',
        blueCyanLogo: '#76dce6',
        blueLogo: '#0D55FF',
        blueTag: '#76dce6',
        blueBold: '#0D55FF',
      },
      keyframes: {
        jelly: {
          '0%, 100%': {
            transform: 'scale(1, 1)',
          },
          '25%': {
            transform: 'scale(0.9, 1.1)',
          },
          '50%': {
            transform: 'scale(1.1, 0.9)',
          },
          '75%': {
            transform: 'scale(0.95, 1.05)',
          },
        },
      },
      inset: {
        18: '76px',
        '-18': '-76px',
      },
      animation: {
        jelly: 'jelly 0.5s',
        transformCustom: 'all .3s cubic-bezier(.215,.61,.355,1) 0s',
        opacityCustom: 'opacity .3s ease 0s,height 0s linear .35s',
      },
    },
  },
  variants: {},
  plugins: [],
  mode: 'jit',
};
