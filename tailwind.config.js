module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './_posts/**/*.md'],
  darkMode: false,
  theme: {
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
