import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Tabs, Tab, Link, Alert, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const NAVY = '#2F4156';
const TEAL = '#567C8D';

export default function Login() {
  const navegar = useNavigate();


  const [tabActual, setTabActual] = useState("Paciente");
  const [alerta, setAlerta] = useState({
    apertura: false,
    mensaje: "",
    severidad: "success"
  });

  const [usuarioActual, setUsuarioActual] = useState("");
  const [passActual, setpassActual] = useState("");

  const cambiarTab = (event, nuevoValor) => {
    setTabActual(nuevoValor);
  };

  const cierreAlerta = (event, reason) => {
    if(reason === 'clickaway') return;
    setAlerta({...alerta, apertura: false});
  };

  const logearClick = () => {
    console.log("valor enviado: ", usuarioActual, passActual);
    
    const datosLogeo = {
      usuario: usuarioActual,
      password: passActual
    };

    fetch('http://localhost:8000/api/logeo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosLogeo)
    })
    .then(respuesta => respuesta.json())
    .then(datos => setAlerta({
      apertura: true,
      mensaje: datos.mensaje,
      severidad: "success"
    }))
    .catch(error => setAlerta({
      apertura: true,
      mensaje: "Error de conexion",
      severidad: "error"
    }));
  };

  const registrarClick = () => {
    console.log("El valor de tabActual es:", tabActual);
    if (tabActual === "Paciente") {
      navegar("/RegistroUsuario");
    }
    if (tabActual === "Personal") {
      navegar("/RegistroMedico");
    }
  };


  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: '#f5f5f3', 
      justifyContent: 'center', 
      alignItems: 'center',
      p: 2
    }}>
      <Container maxWidth="xs" sx={{ padding: 0 }}>
        
        {/* Cabecera: Logo y nombre con tipografía elegante */}
        <Box textAlign="center" mb={4}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: TEAL, margin: '0 auto', mb: 1.5, borderRadius: '14px' }}>
            {/* Logo SVG extraído del menú superior */}
            <svg viewBox="0 0 16 16" fill="none" width="28" height="28">
              <path d="M8 2C8 2 4 5 4 9a4 4 0 0 0 8 0c0-4-4-7-4-7z" fill="white" opacity="0.9"/>
              <path d="M6 8h4M8 6v4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Avatar>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: '#111', letterSpacing: '-0.5px' }}>
            Vitalix 
          </Typography>
          <Typography sx={{ fontSize: 11, color: '#445ba0', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>
            PHRONESIS
          </Typography>
        </Box>

        {/* Formulario de entrada */}
        <Paper variant="outlined" sx={{ 
          borderRadius: 3, 
          overflow: 'hidden', 
          borderColor: 'rgba(0,0,0,0.1)', 
          bgcolor: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          
          {/* Banner con el gradiente característico de los menús */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #066c83 0%, #6b8ae8 60%, #47469a 100%)',
            px: 3, py: 2.5,
            color: 'white',
            display: 'flex', alignItems: 'center', gap: 2,
            position: 'relative', overflow: 'hidden'
          }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, letterSpacing: '1px' }}>
                {tabActual === "Paciente" ? "PC" : "DR"}
              </Typography>
            </Box>
            <Box sx={{ zIndex: 1 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 0.2 }}>Acceso Seguro</Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.85 }}>Identifícate para continuar</Typography>
            </Box>
            {/* Decoración sutil de fondo */}
            <Box sx={{ content: '""', position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          </Box>

          {/* Tabs estéticos */}
          <Tabs 
            value={tabActual} 
            onChange={cambiarTab} 
            variant="fullWidth" 
            sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
            TabIndicatorProps={{ style: { backgroundColor: '#4f46c5', height: 3 } }}
          >
            <Tab label="Paciente" value="Paciente" sx={{ textTransform: 'none', fontSize: 14, fontWeight: tabActual === 'Paciente' ? 600 : 500, color: tabActual === 'Paciente' ? '#3d4c80' : '#888' }} />
            <Tab label="Personal" value="Personal" sx={{ textTransform: 'none', fontSize: 14, fontWeight: tabActual === 'Personal' ? 600 : 500, color: tabActual === 'Personal' ? '#3d4c80' : '#888' }} />
          </Tabs>

          <Box p={3.5}>
            {/* Inputs de usuario */}
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>
              IDENTIFICACIÓN
            </Typography>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Número de ID" 
              onChange={(e)=>setUsuarioActual(e.target.value)}
              sx={{ 
                mb: 2.5,
                '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#fafafa' }
              }} 
            />
            
            <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>
              CONTRASEÑA
            </Typography>
            <TextField 
              fullWidth 
              size="small" 
              type="password" 
              placeholder="••••••••" 
              onChange={(e)=> setpassActual(e.target.value)}
              sx={{ 
                mb: 3.5,
                '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#fafafa' }
              }} 
            />

            <Button 
              fullWidth 
              variant="contained" 
              onClick={logearClick}
              sx={{ 
                bgcolor: NAVY, 
                py: 1.3, 
                borderRadius: 2, 
                textTransform: 'none', 
                fontSize: 14,
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#1a2e3f', boxShadow: 'none' } 
              }}
            >
              Acceder al Portal
            </Button>

            <Link 
              component="button"
              onClick={registrarClick}
              sx={{ 
                display: 'block', 
                width: '100%',
                textAlign: 'center', 
                mt: 2.5, 
                fontSize: 13, 
                color: TEAL, 
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              ¿Olvidaste tu contraseña o quieres registrarte?
            </Link>
          </Box>
        </Paper>
        
        {/* Componente visual de la alerta */}
        <Snackbar 
          open={alerta.apertura} 
          autoHideDuration={6000} 
          onClose={cierreAlerta}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={cierreAlerta} severity={alerta.severidad} variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
            {alerta.mensaje}
          </Alert>
        </Snackbar>

      </Container>
    </Box>
  );
}  