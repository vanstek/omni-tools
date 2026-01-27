import { createTheme, ThemeOptions } from '@mui/material';

const sharedThemeOptions: ThemeOptions = {
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  zIndex: { snackbar: 100000 }
};

// Gruvbox Light Theme
export const lightTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#076678', // faded_blue
      light: '#427b58', // faded_aqua
      dark: '#af3a03' // faded_orange
    },
    secondary: {
      main: '#b57614', // faded_yellow
      light: '#79740e' // faded_green
    },
    error: {
      main: '#9d0006' // faded_red
    },
    background: {
      default: '#ebdbb2', // light1 (grey warm background)
      paper: '#f9f5d7', // light0_hard
      hover: '#d5c4a1', // light2
      lightSecondary: '#d5c4a1', // light2
      darkSecondary: '#bdae93' // light3
    },
    text: {
      primary: '#282828', // dark0 (darker text for more contrast)
      secondary: '#3c3836' // dark1
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: { color: '#fbf1c7', backgroundColor: '#076678' }
      }
    }
  }
});

// Gruvbox Dark Theme
export const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#83a598', // bright_blue
      light: '#8ec07c', // bright_aqua
      dark: '#fe8019' // bright_orange
    },
    secondary: {
      main: '#fabd2f', // bright_yellow
      light: '#b8bb26' // bright_green
    },
    error: {
      main: '#fb4934' // bright_red
    },
    background: {
      default: '#282828', // dark0
      paper: '#1d2021', // dark0_hard
      hover: '#3c3836', // dark1
      lightSecondary: '#3c3836', // dark1
      darkSecondary: '#504945' // dark2
    },
    text: {
      primary: '#ebdbb2', // light1
      secondary: '#d5c4a1' // light2
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: { color: '#282828', backgroundColor: '#83a598' }
      }
    }
  }
});
