import { createTheme } from "@mui/material/styles";

// A custom theme for this app
export const theme = createTheme({
  palette: {
    primary: {
      main: "#00629D;",
    },
    secondary: {
      main: "#C3C6C9",
    },
    error: {
      main: "#DC3545",
    },
    success: {
      main: "#28A745",
    },
    warning: {
      main: "#FFC107",
    },
    info: {
      main: "#2F619D",
    },
    background: {
      default: "#FAFAFA",
    },
  },
});
