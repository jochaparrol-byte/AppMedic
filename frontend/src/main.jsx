
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css'; 

// Material UI stuff
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const miTemaMedico = createTheme({
  palette: {
    primary: {
      main: '#2F4156', // Color Navy
    },
    secondary: {
      main: '#567C8D', // Color Teal
    },
    background: {
      default: '#f1edea', // El beige 
    },
  },
  typography: {
    //  fuentes
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none', // Para que los botones no salgan siempre en mayúsculas
      fontWeight: 600
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={miTemaMedico}>
      {/* CssBaseline ayuda a que los estilos se vean iguales en todos los navegadores */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);