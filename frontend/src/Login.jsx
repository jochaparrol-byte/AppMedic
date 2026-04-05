import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Card, Tabs, Tab, Link, Alert, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// colores para el proyecto
const NAVY = '#2F4156';
const TEAL = '#567C8D';
const SKY_BLUE = '#C8D9E6';
const BEIGE = '#f1edea';

function Login() {
  // Estado para controlar si entra un paciente o personal
  const navegar= useNavigate();

  const [tabActual, setTabActual] = useState(0);
  const [alerta, setAlerta]=useState({
    apertura: false,
    mensaje: "",
    severidad:"succes"
  });

  const [usuarioActual, setUsuarioActual] = useState("");
  const [passActual, setpassActual] = useState("");

  const cambiarTab = (event, nuevoValor) => {
    setTabActual(nuevoValor);
  };
  const cierreAlerta=(event, reason)=>{
    if(reason==='clickaway')return;
    setAlerta({...alerta, apertura:false})
  }
//cargue de datos
//Events clicker
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
      apertura:true,
      mensaje: "Error de conexion",
      severidad: "error"
    }));

   

};
 const registrarClick=()=> {
      navegar("/registro");
    }

  

  return (
    <Container maxWidth="xs" sx={{ paddingY: 4 }}>
      
      {/* Cabecera: Logo y nombre de mi App */}
      <Box textAlign="center" mb={3}>
        <Avatar sx={{ bgcolor: NAVY, margin: '0 auto', mb: 1 }}>V</Avatar>
        <Typography variant="h5" color={NAVY} fontWeight="700">
          Vitalix
        </Typography>
        <Typography variant="body2" color={TEAL}>
          Phronesis
        </Typography>
      </Box>

      {/* Banner informativo */}
      <Card sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        mb: 2, 
        borderRadius: 4, 
        bgcolor: TEAL, 
        color: 'white' 
      }}>
        <Avatar sx={{ bgcolor: 'white', color: TEAL, mr: 2 }}>DR</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">Acceso Seguro</Typography>
          <Typography variant="caption" sx={{ color: SKY_BLUE }}>
            Identifícate para continuar
          </Typography>
        </Box>
      </Card>

      {/* Formulario de entrada */}
      <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden', borderColor: SKY_BLUE }}>
        
        <Tabs 
          value={tabActual} 
          onChange={cambiarTab} 
          variant="fullWidth" 
          sx={{ bgcolor: SKY_BLUE }}
        >
          <Tab label="Paciente" sx={{ textTransform: 'none', fontWeight: 'bold', color: NAVY }} />
          <Tab label="Personal" sx={{ textTransform: 'none', fontWeight: 'bold', color: NAVY }} />
        </Tabs>

        <Box p={4} bgcolor={BEIGE}>
          {/* Inputs de usuario */}
          <Typography variant="caption" fontWeight="bold" color={NAVY}>IDENTIFICACIÓN</Typography>
          <TextField 
            fullWidth 
            size="small" 
            placeholder="Número de ID" 
            sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} 
            onChange={(e)=>setUsuarioActual(e.target.value)}
          />
          
          <Typography variant="caption" fontWeight="bold" color={NAVY}>CONTRASEÑA</Typography>
          <TextField 
            fullWidth 
            size="small" 
            type="password" 
            placeholder="••••••••" 
            sx={{ bgcolor: 'white', mt: 0.5, mb: 3 }} 
            onChange={(e)=> setpassActual(e.target.value)}
          />

          <Button 
            fullWidth 
            variant="contained" 
            onClick={logearClick}
            sx={{ 
              bgcolor: NAVY, 
              py: 1.5, 
              borderRadius: 2, 
              textTransform: 'none', 
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#1a2e3f' } 
            }}
          >
            Acceder al Portal
          </Button>

          <Link 
            href="#" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              mt: 2, 
              fontSize: '0.8rem', 
              color: TEAL, 
              textDecoration: 'none' 
            }}
            onClick={registrarClick}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
      </Paper>
      <div style={{ padding: '50px' }}>
        {/* ... tus TextField y Botones ... */}

        {/* El componente visual de la alerta */}
        <Snackbar 
          open={alerta.apertura} 
          autoHideDuration={6000} // Se cierra sola a los 6 segundos
          onClose={cierreAlerta}
        >
          <Alert onClose={cierreAlerta} severity={alerta.severidad} sx={{ width: '100%' }}>
            {alerta.mensaje}
          </Alert>
        </Snackbar>
      </div>
      
    </Container>
  );
}

export default Login;