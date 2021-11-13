import { green } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: {
      main: '#2d2d2d',
      text: '#fff',
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Inter',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif',
      ],
    },
  },
} as any);
export type Theme = typeof theme;
export default theme;
