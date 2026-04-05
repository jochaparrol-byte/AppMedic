import React from "react";
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Card, Tabs, Tab, Link, Alert, Snackbar
} from '@mui/material';

const NAVY = '#2F4156';
const TEAL = '#567C8D';
const SKY_BLUE = '#C8D9E6';
const BEIGE = '#f1edea';
function Register() {
  return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        
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
            <Typography variant="subtitle2" fontWeight="bold">Crear cuenta</Typography>
            <Typography variant="caption" sx={{ color: SKY_BLUE }}>
              Por favor, completa los datos para registrarte
            </Typography>
          </Box>
        </Card>
  
        {/* Formulario de entrada */}
        <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden', borderColor: SKY_BLUE, flexDirection:"column" }}>
          
          <Box display="flex" p={4} bgcolor={BEIGE} gap={2}>
            {/* Inputs de usuario */}
            <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>NOMBRES COMPLETOS</Typography>
                <TextField 
                fullWidth
                size="small" 
                placeholder="Tus nombres" 
                sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} 
                
                />
            </Box>
            
            <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>APELLIDOS COMPLETOS</Typography>
                <TextField 
                fullWidth
                size="small" 
                placeholder="Tus apellidos" 
                sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} 
                
                />
            </Box>
            <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>NOMBRES COMPLETOS</Typography>
                <TextField 
                fullWidth
                size="small" 
                placeholder="Tus nombres" 
                sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} 
                
                />
            </Box>
            
            <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>APELLIDOS COMPLETOS</Typography>
                <TextField 
                fullWidth
                size="small" 
                placeholder="Tus apellidos" 
                sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} 
                
                />
            </Box>
            
  
            
            
          </Box>
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
        </Paper>
        
      </Container>
    );
}

export default Register;