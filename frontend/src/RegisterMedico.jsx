import React, { useState } from "react";
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Card, Tabs, Tab, Link, Alert, Snackbar,
  Select,
  FormControl,
  MenuItem,
  Menu
} from '@mui/material';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import{AdapterDayjs}from '@mui/x-date-pickers/AdapterDayjs'
import{DatePicker}from '@mui/x-date-pickers/DatePicker';


const NAVY = '#2F4156';
const TEAL = '#567C8D';
const SKY_BLUE = '#C8D9E6';
const BEIGE = '#f1edea';
function RegisterMedico() {
  const [tipoSangre, setTipoSangre]=useState("")
  const [tipoDoucmento, setTipoDocumento]=useState("")
  const [tipoSexo, setTipoSexo]=useState("")
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
        <Paper variant="outlined" sx={{display:'flex', flexDirection:'column', borderRadius: 4, overflow: 'hidden', borderColor: SKY_BLUE} }>

          {/*// ! PRIMER BLOQUE DE INFORMACION */}
          <Box display="flex" px={4} pt={4} bgcolor={BEIGE} gap={2}>
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
            
          </Box>

          {/*// ! SEGUNDO BLOQUE DE INFORMACION. */}
          {/*// *MODIFICAR LOS SELECT PARA QUE SEAN RESPONSIVE */} 
          
          <Box display={"flex"} px={4} pb={0} gap={2} bgcolor={BEIGE}>
            <Box flex={6/10}>
              <Typography variant="caption"  fontWeight={"bold"} color={NAVY}>TIPO DE DOCUMENTO</Typography>
              <FormControl fullWidth size="small">
                <Select value={tipoDoucmento} onChange={(e)=> setTipoDocumento(e.target.value)} displayEmpty sx={{bgcolor:'white', mt:0.5, mb:2}}>
                  <MenuItem value="" disabled>
                  <span style={{color:'aaa'}}>Seleccionar</span>
                  </MenuItem>
                  <MenuItem value="CC">CC</MenuItem>
                  <MenuItem value="TI">TI</MenuItem>
                  <MenuItem value="P">P</MenuItem>
                  <MenuItem value="PPT">PPT</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box flex={1}>
              <Typography variant="caption" fontWeight="bold" color={NAVY}>NUMERO DE DOCUMENTO</Typography>
              <TextField fullWidth size="small" placeholder="Numero de documento" sx={{bgcolor:"white", mt:0.5, mb:2}} flex={1}></TextField>
            </Box>
            
            <LocalizationProvider dateAdapter={AdapterDayjs} flex={1}>
            <Box flex={1}>
              <Typography variant="caption" fontWeight="bold" color={NAVY}>FECHA DE NACIMIENTO</Typography>
              <DatePicker
              slotProps={{ 
                textField: { 
                  size: 'small', 
                  fullWidth: true, 
                  sx: { bgcolor: 'white', mt: 0.5, mb:2 } 
                } 
              }}/>
            </Box>
            </LocalizationProvider>
            <Box flex={1}>

              <Typography variant="caption" fontWeight="bold" color={NAVY} >SEXO BIOLOGICO</Typography>
              <FormControl fullWidth size="small">
                <Select value={tipoSexo} onChange={(e)=>setTipoSexo(e.target.value)} displayEmpty sx={{bgcolor:'white', mt:0.5, mb:2}}>
                  <MenuItem value="" disabled>
                  <span style={{color:'aaa'}}>Seleccionar</span>
                  </MenuItem>
                  <MenuItem value="MASCULINO">Masculino</MenuItem>
                  <MenuItem value="FEMENINO">Femenino</MenuItem>

                </Select>
              </FormControl>  
            </Box>
            <Box flex={1/2}>
              <Typography variant="caption" fontWeight="bold" color={NAVY}>TIPO DE SANGRE</Typography>
              <FormControl fullWidth size="small">
                <Select value={tipoSangre} onChange={(e)=>setTipoSangre(e.target.value)} displayEmpty sx={{bgcolor:'white', mt:0.5, mb:2}}>
                  <MenuItem value="" disabled>
                  <span>Seleccionar</span>
                  </MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>

                </Select>

              </FormControl>
            </Box>
          </Box>

          {/* // ! Tercer bloque */}

          <Box display={"flex"} px={4} gap={2} bgcolor={BEIGE}>
              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>TELEFONO CELULAR</Typography>
                <TextField fullWidth size="small" placeholder="Ingresar" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>

              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>CORREO ELECTRONICO</Typography>
                <TextField fullWidth size="small" placeholder="Ingresar valor" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>

              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>DIRECCION DE RESIDENCIA</Typography>
                <TextField fullWidth size="small" placeholder="Ingresar valor" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>

              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>OCUPACION</Typography>
                <TextField fullWidth size="small" placeholder="Ocupacion" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
          </Box>

          {/* // !Cuarto bloque */}
          <Box display={"flex"} px={4} gap={2} bgcolor={BEIGE}>
              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>PARENTESCO CONTACTO DE EMERGENCIA</Typography>
                <TextField fullWidth size="small" placeholder="Parentesco CE" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
              <Box flex={1}>
                  <Typography variant="caption" fontWeight="bold" color={NAVY}>CONTACTO DE EMERGENCIA</Typography>
                  <TextField fullWidth size="small" placeholder="Nombre del contacto" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>NUMERO DE CONTACTO</Typography>
                <TextField fullWidth size="small" placeholder="Numero del contacto" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
          </Box>
          {/* // ! Quinto bloque */}
          <Box display={"flex"} px={4} gap={2} bgcolor={BEIGE}>
              <Box sx={{width:'100%'}}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>ALERGIAS</Typography>
                <TextField fullWidth multiline rows={3} placeholder="Penicilina, Latex, Nueces...(Si no tiene, escriba ninguna)" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>CREDENCIALES DE ACCESO</Typography>
          </Box>
          <Box display={"flex"} px={4} bgcolor={BEIGE} gap={2}>
              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>CONTRASEÑA</Typography>
                <TextField fullWidth size="small" type="password" placeholder="••••••••" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
              </Box>
              <Box flex={1}>
                <Typography variant="caption" fontWeight="bold" color={NAVY}>CONFIRMAR CONTRASEÑA</Typography>
                <TextField fullWidth size="small" placeholder="••••••••" sx={{bgcolor:"white", mt:0.5, mb:2}}></TextField>
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

export default RegisterMedico;