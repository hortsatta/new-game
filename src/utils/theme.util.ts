import { createTheme, globalCss } from '@nextui-org/react';

const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#181818',
      //semantic colors
      primary100: 'fc0005',
      primary200: '#fcb197',
      primary300: '#f67b62',
      primary400: '#ec4a3b',
      primary500: '#e10000',
      primary600: '#c10010',
      // brand colors
      primaryLight: '$primary200',
      primaryLightHover: '$primary300',
      primaryLightActive: '$primary400',
      primaryLightContrast: '$primary600',
      primary: '$primary500',
      primaryBorder: 'rgba(255,255,255,0.25)',
      primaryBorderHover: '$primary100',
      primarySolidHover: '$primary700',
      primarySolidContrast: '$white',
      primaryShadow: 'rgba(225,0,0,0.6)',
    },
    fonts: {
      sans: 'primary, sans-serif;',
    },
  },
});

const globalStyles = globalCss({
  body: {
    '.simplebar-scrollbar::before': { bg: 'rgba(193,0,16,0.6)' },
    'h1, h2, h3, h4, h5, h6': { mb: '$2', letterSpacing: '0.1px' },
    'button.nextui-button': {
      transition: 'filter 0.2s ease',
      '&:hover': { filter: 'brightness(120%)' },
    },
  },
});

export { theme, globalStyles };
