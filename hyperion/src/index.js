import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createTheme, ThemeProvider } from "@mui/material";
// import "bootstrap/dist/css/bootstrap.min.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#63489b",
      light: "#d8d8d8",
      dark: "#120a27",
    },
    secondary: {
      main: "#f39566",
      light: "#f3be66",
      dark: "#ce10fa",
    },
  },
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <ThemeProvider theme={this.props.theme}>
  <React.StrictMode>    <App />
  </React.StrictMode>

  // </ThemeProvider>
);