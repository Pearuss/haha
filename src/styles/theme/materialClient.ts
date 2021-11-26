import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily:
      'Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  },
  palette: {
    primary: {
      main: '#8C8C8C',
    },
    secondary: {
      main: '#ffffff',
    },

    error: {
      main: '#dd6b20',
    },
  },
});

export default theme;
