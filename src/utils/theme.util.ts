import { createTheme } from '@nextui-org/react';

export const theme = createTheme({
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
      primaryShadow: '$primary500',
    },
    fonts: {
      sans: 'primary, sans-serif;',
    },
  },
});
