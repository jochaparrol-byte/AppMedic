import React, { useState } from "react";
import { 
  Container, Box, Typography, TextField, 
  Button, Paper, Avatar, Card,
  Select,
  FormControl,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const NAVY = '#2F4156';
const TEAL = '#567C8D';
const SKY_BLUE = '#C8D9E6';
const BEIGE = '#f1edea';

function RegisterMedico() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [sexo, setSexo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [registroMedico, setRegistroMedico] = useState("");
  const [archivoTarjeta, setArchivoTarjeta] = useState(null);
  const [correo, setCorreo] = useState("");
  const [pass, setPass] = useState("");

  const [alerta, setAlerta] = useState({
    apertura: false,
    mensaje: "",
    severidad: "success"
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setArchivoTarjeta(e.target.files[0]);
    }
  };

  const registroClick = () => {
    console.log("Registrando Médico:", { nombres, especialidad, registroMedico });
    setAlerta({
      apertura: true,
      mensaje: "Registro médico enviado al sistema",
      severidad: "success"
    });
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box textAlign="center" mb={3}>
        <Avatar sx={{ bgcolor: NAVY, margin: '0 auto', mb: 1 }}>V</Avatar>
        <Typography variant="h5" color={NAVY} fontWeight="700">Vitalix</Typography>
        <Typography variant="body2" color={TEAL}>Phronesis | Registro de Médicos</Typography>
      </Box>

      <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, borderRadius: 4, bgcolor: TEAL, color: 'white' }}>
        <Avatar sx={{ bgcolor: 'white', color: TEAL, mr: 2 }}>MD</Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">Registro de Profesional</Typography>
          <Typography variant="caption" sx={{ color: SKY_BLUE }}>Complete la información para habilitar su cuenta médica</Typography>
        </Box>
      </Card>

      <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden', borderColor: SKY_BLUE }}>
        
        {/* BLOQUE 1: Nombres y Apellidos */}
        <Box display="flex" px={4} pt={4} bgcolor={BEIGE} gap={2}>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>NOMBRES COMPLETOS</Typography>
            <TextField fullWidth size="small" sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} onChange={(e)=>setNombres(e.target.value)} />
          </Box>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>APELLIDOS COMPLETOS</Typography>
            <TextField fullWidth size="small" sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }} onChange={(e)=>setApellidos(e.target.value)} />
          </Box>
        </Box>

        {/* BLOQUE 2: Documentos, Nacimiento y Sexo */}
        <Box display="flex" px={4} gap={2} bgcolor={BEIGE}>
          <Box flex={0.4}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>TIPO DOC.</Typography>
            <FormControl fullWidth size="small">
              <Select value={tipoDocumento} onChange={(e)=>setTipoDocumento(e.target.value)} displayEmpty sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }}>
                <MenuItem value="" disabled>Seleccionar</MenuItem>
                <MenuItem value="CC">CC</MenuItem>
                <MenuItem value="CE">CE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box flex={0.8}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>NÚMERO DOCUMENTO</Typography>
            <TextField fullWidth size="small" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setNumeroDocumento(e.target.value)} />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box flex={0.8}>
              <Typography variant="caption" fontWeight="bold" color={NAVY}>FECHA DE NACIMIENTO</Typography>
              <DatePicker 
                slotProps={{ textField: { size: 'small', fullWidth: true, sx: { bgcolor: 'white', mt: 0.5, mb: 2 } } }} 
                onChange={(val) => setFechaNacimiento(val)}
              />
            </Box>
          </LocalizationProvider>
          <Box flex={0.6}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>SEXO BIOLÓGICO</Typography>
            <FormControl fullWidth size="small">
              <Select value={sexo} onChange={(e)=>setSexo(e.target.value)} displayEmpty sx={{ bgcolor: 'white', mt: 0.5, mb: 2 }}>
                <MenuItem value="" disabled>Seleccionar</MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* BLOQUE 3: Contacto y Ubicación */}
        <Box display="flex" px={4} gap={2} bgcolor={BEIGE}>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>TELÉFONO / CELULAR</Typography>
            <TextField fullWidth size="small" placeholder="Ej: 300..." sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setTelefono(e.target.value)} />
          </Box>
          <Box flex={2}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>DIRECCIÓN RESIDENCIAL</Typography>
            <TextField fullWidth size="small" placeholder="Dirección de residencia" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setDireccion(e.target.value)} />
          </Box>
        </Box>

        {/* BLOQUE 4: Información Profesional */}
        <Box display="flex" px={4} gap={2} bgcolor={BEIGE}>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>ESPECIALIDAD</Typography>
            <TextField fullWidth size="small" placeholder="Ej: Pediatría" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setEspecialidad(e.target.value)} />
          </Box>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>REGISTRO MÉDICO (RETHUS)</Typography>
            <TextField fullWidth size="small" placeholder="N° Registro" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setRegistroMedico(e.target.value)} />
          </Box>
        </Box>

        {/* BLOQUE 5: Soporte y Credenciales */}
        <Box display="flex" px={4} gap={2} bgcolor={BEIGE}>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>TARJETA PROFESIONAL (ADJUNTAR)</Typography>
            <Button variant="outlined" component="label" fullWidth startIcon={<CloudUploadIcon />} sx={{ mt: 0.5, mb: 2, bgcolor: 'white', borderColor: SKY_BLUE, color: TEAL, textTransform: 'none', borderStyle: 'dashed' }}>
              {archivoTarjeta ? archivoTarjeta.name : "Subir archivo"}
              <input type="file" hidden onChange={handleFileChange} accept=".pdf,image/*" />
            </Button>
          </Box>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>CORREO ELECTRÓNICO</Typography>
            <TextField fullWidth size="small" placeholder="profesional@vitalix.com" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setCorreo(e.target.value)} />
          </Box>
        </Box>

        <Box display="flex" px={4} bgcolor={BEIGE} gap={2} pb={2}>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>CONTRASEÑA</Typography>
            <TextField fullWidth size="small" type="password" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} onChange={(e)=>setPass(e.target.value)} />
          </Box>
          <Box flex={1}>
            <Typography variant="caption" fontWeight="bold" color={NAVY}>CONFIRMAR CONTRASEÑA</Typography>
            <TextField fullWidth size="small" type="password" sx={{ bgcolor: "white", mt: 0.5, mb: 2 }} />
          </Box>
        </Box>

        <Button 
          fullWidth 
          variant="contained" 
          onClick={registroClick}
          sx={{ bgcolor: NAVY, py: 2, borderRadius: 0, textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#1a2e3f' } }}
        >
          Finalizar Registro Médico
        </Button>
      </Paper>

      <Snackbar open={alerta.apertura} autoHideDuration={6000} onClose={()=>setAlerta({...alerta, apertura:false})}>
        <Alert severity={alerta.severidad} sx={{ width: '100%' }}>{alerta.mensaje}</Alert>
      </Snackbar>
    </Container>
  );
}

export default RegisterMedico;