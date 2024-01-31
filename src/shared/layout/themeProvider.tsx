'use client'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

export const themeProvider = createTheme({
  palette: {
    primary: {
      main: '#956AFB',
    },
    secondary: {
      main: '#5B2591',
    },
    background: {
      default: '#FDFDFD',
    },
    text: {
      primary: '#39474F',
      secondary: '#4A3D90',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export const theme = {
  
  colors: {
    DARK: "#00806E",
    PRIMARY: "#956AFB",
    SECONDARY: "#049985",
    LIGHT: "rgba(5, 181, 157, 0.04)",
    GREEN: "#19D26E",
    GREEN_LIGHT: "rgba(71, 178, 98, .2)",
    BLUE: "#53AFED",
    SYNPASS_GREEN: "rgba(0, 224, 109, 1)",
    DANGER_CAM: "#970D0D",
    WARNING_CAM: "#DDA410",

    GRAY_1000: "#000000 ",
    "rgba(0, 0, 0, 0.87)": "rgba(0, 0, 0, 0.87)",
    GRAY_400: "rgba(0, 0, 0, 0.6)",
    GRAY_300: "rgba(0, 0, 0, 0.38)",
    "rgba(0, 0, 0, 0.25)": "rgba(0, 0, 0, 0.25)",
    GRAY_150: "Rgba(0, 0, 0, 0.15)",
    GRAY_100: "rgba(0, 0, 0, 0.08)",
    "#E8E8E8": "#E8E8E8",
    GRAY_50: "#DFE1E2",
    GRAY_25: "#F2F2F2",
    GRAY_15: "#FAFAFA",
    GRAY_00: "#FFFFFF",

    DANGER: "#C61010",
    DANGER_LIGHT: "rgba(198, 16, 16, 0.1)",
    DANGER_LIGHT_TO: "rgba(198, 16, 16, 0.3)",
    WARNING_LIGHT: "#FEF9E1",
    WARNING: "#CA9F00",
    WARNING_DARK: "#B16000",
  },
  fonts: {
    family: {
      PRIMARY: "'Montserrat', 'Roboto', sans-serif",
      SECONDARY: "'Roboto', 'Montserrat', sans-serif",
      ALTERNATIVE: "'Nunito', 'Montserrat', 'Roboto', sans-serif",
    },
    sizes: {
      12: ".75rem",
      14: ".875rem",
      16: "1rem",
      18: "1.125rem",
      20: "1.25rem",
      24: "1.5rem",
      28: "1.75rem",
      34: "2.125rem ",
    },
    height: {
      12: ".875rem",
      14: "1rem",
      16: "1.5rem ",
      20: "1.5rem",
      24: "1.8125rem",
      34: "2.5625rem",
    },
  },
  zIndex: {
    BASE: 1010,
    DROPDOWN: 1015,
    MENU: 1020,
    OVERLAY: 1030,
    MODAL: 1040,
    MODAL_TWO: 1041,
  },
  breakpoints: {
    mobile: "767px",
    tablet: "1024px",
    desktop: "1440px",
  },
  spacing (size: number) {
    return `${size * 0.5}rem`;
  },
};

export const StyledThemeProvider = ({ children }: any) => (
  <ThemeProvider theme={themeProvider}>{children}</ThemeProvider>
);