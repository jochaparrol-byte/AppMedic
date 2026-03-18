//npm run dev para iniciar el servidor
import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Avatar, Link, Divider } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      alert(result.message || "Acceso procesado");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 5 }}>
        <Avatar sx={{ m: 'auto', bgcolor: '#00796B', width: 60, height: 60, mb: 2 }}>
          <LocalHospitalIcon sx={{ fontSize: 35 }} />
        </Avatar>
        <Typography variant="h4" sx={{ color: '#00796B', fontWeight: 'bold', mb: 3 }}>Login</Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField fullWidth label="Email*" variant="standard" margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" variant="standard" margin="normal" onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, mb: 2, borderRadius: 2, py: 1.5, bgcolor: '#00796B' }}>Sign Up</Button>
          <Link href="#" variant="body2" color="textSecondary" underline="none">Forgot Password?</Link>
          <Divider sx={{ my: 3 }}>Or</Divider>
          <Button fullWidth variant="contained" startIcon={<FacebookIcon />} sx={{ mb: 2, bgcolor: '#3b5998', textTransform: 'none' }}>Facebook</Button>
          <Button fullWidth variant="contained" startIcon={<GoogleIcon />} sx={{ bgcolor: '#DB4437', textTransform: 'none' }}>Google</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
