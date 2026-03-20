import React, { useState } from 'react';
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Card, Tabs, Tab, Link 
} from '@mui/material';

// colores para el proyecto
const NAVY = '#2F4156';
const TEAL = '#567C8D';
const SKY_BLUE = '#C8D9E6';
const BEIGE = '#f1edea';

function App() {
  // Estado para controlar si entra un paciente o personal
  const [tabActual, setTabActual] = useState(0);

  const cambiarTab = (event, nuevoValor) => {
    setTabActual(nuevoValor);
  };

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
          />
          
          <Typography variant="caption" fontWeight="bold" color={NAVY}>CONTRASEÑA</Typography>
          <TextField 
            fullWidth 
            size="small" 
            type="password" 
            placeholder="••••••••" 
            sx={{ bgcolor: 'white', mt: 0.5, mb: 3 }} 
          />

          <Button 
            fullWidth 
            variant="contained" 
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
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>
      </Paper>
      
    </Container>
  );
}

export default App;