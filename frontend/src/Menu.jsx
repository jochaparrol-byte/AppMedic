import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  Grid, TextField, MenuItem 
} from '@mui/material';

// ── Colores del proyecto 
const NAVY   = '#2F4156';
const TEAL   = '#567C8D';
const SKY    = '#C8D9E6';
const BEIGE  = '#f1edea';
const ACCENT = '#066c83';

// ── Íconos SVG 
const IcoGrid   = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/></svg>;
const IcoCalPlus = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v2M10 1v2M1 6h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4 9h2M4 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoClock   = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoList    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M2 2h11v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoUser    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoStar    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5l1.9 3.8 4.2.6-3 2.95.7 4.15L7.5 11l-3.8 2L4.4 8.85 1.4 5.9l4.2-.6L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;
const IcoFlask   = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M7.5 2a5.5 5.5 0 1 0 0 11A5.5 5.5 0 0 0 7.5 2z" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoDoc     = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M4 2h7l2 2v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoLogout  = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M7.5 1A6.5 6.5 0 0 0 1 7.5h2a4.5 4.5 0 1 1 4.5 4.5V14A6.5 6.5 0 0 0 7.5 1z" fill="currentColor" opacity="0.4"/><path d="M9.5 7.5L6 5v5l3.5-2.5z" fill="currentColor"/></svg>;
const IcoCal     = () => <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#0F6E56" strokeWidth="1.2"/><path d="M4.5 1v2M9.5 1v2M1 6h12" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── Secciones de Navegación 
const navSections = [
  { label: 'Principal', items: [{ text: 'Inicio', icon: <IcoGrid /> }] },
  { label: 'Citas', items: [
      { text: 'Agendar cita', icon: <IcoCalPlus /> },
      { text: 'Mis citas', icon: <IcoList /> },
    ]
  },
  { label: 'Servicios', items: [
      { text: 'Urgencias 24/7', icon: <IcoStar /> },
      { text: 'Laboratorio', icon: <IcoFlask /> },
      { text: 'Historial médico', icon: <IcoDoc /> },
    ]
  },
];

const serviceCards = [
  { label: 'Urgencias 24/7', sub: 'Atención inmediata todos los días.', bg: '#E1F5EE', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" stroke="#1D9E75" strokeWidth="1.3"/><path d="M8 5v3l2 1" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: 'Cardiología', sub: 'Diagnóstico cardíaco avanzado.', bg: '#E6F1FB', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 8h8M8 4v8" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: 'Maternidad', sub: 'Cuidado integral para mamá y bebé.', bg: '#FAEEDA', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><circle cx="8" cy="6" r="3" stroke="#BA7517" strokeWidth="1.3"/><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#BA7517" strokeWidth="1.3" strokeLinecap="round"/></svg> },
];

const doctoresEspecialidad = {
  'Medicina General': 'Dra. Lucía Herrera',
  'Pediatría': 'Dra. María Gómez',
  'Odontología': 'Dr. Carlos Ruiz',
  'Neurología': 'Dra. Elena Vargas',
  'Ginecología': 'Dra. Sofia Castro',
  'Cardiología': 'Dr. Andrés Mora'
};

const horariosDisponibles = [
  { hora: '08:00 AM', libre: true }, { hora: '08:30 AM', libre: false },
  { hora: '09:00 AM', libre: true }, { hora: '10:00 AM', libre: false },
  { hora: '10:30 AM', libre: true }, { hora: '11:30 AM', libre: true },
  { hora: '02:00 PM', libre: false }, { hora: '03:00 PM', libre: true },
  { hora: '04:30 PM', libre: true }
];

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('Inicio');

  const [especialidad, setEspecialidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  
  const [misCitasLista, setMisCitasLista] = useState([
    {
      id: 1, paciente: 'Paciente Actual', especialidad: 'Medicina General',
      medico: 'Dra. Lucía Herrera', fecha: '2026-06-15', hora: '10:30 AM',
      motivo: 'Control general de rutina', estado: 'Confirmada'
    }
  ]);

  const handleConfirmarCita = () => {
    if (!especialidad || !fecha || !horaSeleccionada || !motivoConsulta) {
      alert(" Por favor completa todos los campos y selecciona una hora disponible.");
      return;
    }

    const nuevaCita = {
      id: Date.now(),
      paciente: 'Paciente Actual',
      especialidad: especialidad,
      medico: doctoresEspecialidad[especialidad],
      fecha: fecha,
      hora: horaSeleccionada,
      motivo: motivoConsulta,
      estado: "Confirmada"
    };

    setMisCitasLista([nuevaCita, ...misCitasLista]);
    alert("¡Cita registrada correctamente!");
    
    setEspecialidad('');
    setFecha('');
    setHoraSeleccionada('');
    setMotivoConsulta('');
    setActiveItem('Mis citas');
  };

  return (
    // CONTENEDOR PRINCIPAL:
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', maxWidth: '80%', bgcolor: '#f5f5f3', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <Box sx={{ height: 56, width: '100%', bgcolor: 'white', flexShrink: 0, borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: TEAL, borderRadius: '6px' }}>
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M8 2C8 2 4 5 4 9a4 4 0 0 0 8 0c0-4-4-7-4-7z" fill="white" opacity="0.9"/>
              <path d="M6 8h4M8 6v4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Avatar>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: NAVY, letterSpacing: '-0.3px' }}>
            Vitalix
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, width: '100%', overflow: 'hidden' }}>
        
        {/* MENÚ LATERAL */}
        <Box component="nav" sx={{ width: 220, flexShrink: 0, bgcolor: 'white', borderRight: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', py: 1.5, overflowY: 'auto' }}>
          {navSections.map((section, si) => (
            <React.Fragment key={section.label}>
              {si > 0 && <Divider sx={{ mx: 2, my: 1, borderColor: 'rgba(0,0,0,0.06)' }} />}
              <Typography sx={{ px: 2.5, pb: 0.5, pt: si === 0 ? 0 : 1, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>{section.label}</Typography>
              <List disablePadding>
                {section.items.map(item => {
                  const isActive = activeItem === item.text;
                  return (
                    <ListItem key={item.text} onClick={() => setActiveItem(item.text)} sx={{ px: 2.5, py: 1, gap: 1, cursor: 'pointer', borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent', bgcolor: isActive ? '#E1F5EE' : 'transparent', color: isActive ? NAVY : '#666', fontWeight: isActive ? 600 : 500, '&:hover': { bgcolor: '#f9f9f9', color: NAVY }, transition: 'all 0.2s' }}>
                      <ListItemIcon sx={{ minWidth: 0, color: 'inherit', opacity: isActive ? 1 : 0.8 }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 13 }} />
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Divider sx={{ mx: 2, my: 1.5, borderColor: 'rgba(0,0,0,0.06)' }} />
          {[ { text: 'Mi perfil', icon: <IcoUser /> }, { text: 'Cerrar sesión', icon: <IcoLogout /> } ].map(item => (
            <ListItem key={item.text} onClick={() => setActiveItem(item.text)} sx={{ px: 2.5, py: 1, gap: 1, cursor: 'pointer', color: '#666', '&:hover': { bgcolor: '#f9f9f9', color: NAVY } }}>
              <ListItemIcon sx={{ minWidth: 0, color: 'inherit', opacity: 0.8 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 13 }} />
            </ListItem>
          ))}
        </Box>

        {/* AREA PRINCIPAL: Ocupa todo el ancho restante */}
        <Box component="main" sx={{ flexGrow: 1, width: 'calc(100% - 220px)', overflowY: 'auto' }}>
          
          {/* CONTENEDOR CENTRAL PARA TODAS LAS PESTAÑAS */}
          <Box
            sx={{
              width: '90%',
              maxWidth: '1100px',
              minWidth: '700px',
              margin: '0 auto',
              py: 4,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {activeItem === 'Inicio' ? (
              <Box sx={{ width: '100%' }}>
                <Box sx={{ background: 'linear-gradient(135deg, #066c83 0%, #6b8ae8 60%, #47469a 100%)', borderRadius: 3, p: 3, color: 'white', mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', opacity: 0.9, mb: 1, fontWeight: 600 }}>Bienvenido de nuevo</Typography>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, mb: 1, lineHeight: 1.2 }}>Tu salud en<br />manos expertas</Typography>
                  <Typography sx={{ fontSize: 14, opacity: 0.9, mb: 2.5, maxWidth: 400 }}>Atención médica integral y un equipo comprometido con tu bienestar.</Typography>
                  <Button startIcon={<IcoCal />} onClick={() => setActiveItem('Agendar cita')} sx={{ bgcolor: 'white', color: '#3d5b8d', borderRadius: 2, px: 2.5, py: 1, fontSize: 13, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#f0f0f0' } }}>
                    Agendar cita médica
                  </Button>
                </Box>

                {/* TARJETAS DE SERVICIOS EXPANDIDAS */}
                <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                  {serviceCards.map(card => (
                    <Paper 
                      key={card.label}
                      elevation={0} 
                      sx={{ 
                        flex: 1, 
                        borderRadius: 2.5, 
                        p: 2.5, 
                        border: '1px solid rgba(0,0,0,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: '#fafafa', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }
                      }}
                    >
                      <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                        {card.icon}
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: NAVY, mb: 0.5 }}>{card.label}</Typography>
                      <Typography sx={{ fontSize: 12, color: '#666' }}>{card.sub}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>

            ) : activeItem === 'Agendar cita' ? (
              <Box sx={{ width: '100%' }}>
                <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: 2.5, background: `linear-gradient(135deg, ${TEAL} 0%, ${NAVY} 100%)`, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', p: 1, borderRadius: 1.5, display: 'flex' }}><IcoCalPlus /></Box>
                  <Box>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Nueva Cita y Triaje</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.85 }}>Selecciona tu especialidad, fecha y verifica la disponibilidad.</Typography>
                  </Box>
                </Paper>

                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 3, borderColor: 'rgba(0,0,0,0.08)', bgcolor: 'white', width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ bgcolor: '#E1F5EE', p: 1.5, borderRadius: 1.5, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: '#0e5e8a', display: 'flex' }}><IcoClock /></Box>
                    <Typography sx={{ fontSize: 12.5, color: '#0e5e8a', fontWeight: 500 }}>
                      <strong>Información:</strong> Las casillas grises están ocupadas. Selecciona las azules.
                    </Typography>
                  </Box>

                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>ESPECIALIDAD MÉDICA</Typography>
                      <TextField select fullWidth value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, bgcolor: '#fcfcfc' } }}>
                        <MenuItem value="Medicina General">Medicina General</MenuItem>
                        <MenuItem value="Pediatría">Pediatría</MenuItem>
                        <MenuItem value="Odontología">Odontología</MenuItem>
                        <MenuItem value="Neurología">Neurología</MenuItem>
                        <MenuItem value="Ginecología">Ginecología</MenuItem>
                        <MenuItem value="Cardiología">Cardiología</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>MÉDICO ASIGNADO AUTOMÁTICAMENTE</Typography>
                      <Box sx={{ p: 1, bgcolor: BEIGE, borderRadius: 1.5, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', height: '40px', boxSizing: 'border-box' }}>
                        <Typography sx={{ fontSize: 13, color: especialidad ? NAVY : '#888', fontWeight: especialidad ? 600 : 400 }}>
                          {especialidad ? doctoresEspecialidad[especialidad] : 'Selecciona una especialidad...'}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>SÍNTOMAS / MOTIVO DE LA CONSULTA</Typography>
                      <TextField fullWidth multiline rows={2} placeholder="Indica brevemente tus síntomas..." value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, bgcolor: '#fcfcfc' } }} />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 0.5, borderColor: 'rgba(0,0,0,0.06)' }} />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>SELECCIONAR FECHA</Typography>
                      <TextField fullWidth type="date" value={fecha} onChange={(e) => {setFecha(e.target.value); setHoraSeleccionada('');}} InputLabelProps={{ shrink: true }} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, bgcolor: '#fcfcfc' } }} />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '0.5px' }}>HORARIOS DISPONIBLES</Typography>
                      {!fecha ? (
                        <Typography sx={{ fontSize: 12.5, color: '#888', fontStyle: 'italic', pt: 0.5 }}>Selecciona un día en el calendario.</Typography>
                      ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 0.5 }}>
                          {horariosDisponibles.map((slot, idx) => (
                            <Chip 
                              key={idx} label={slot.hora} size="small" disabled={!slot.libre} onClick={() => slot.libre && setHoraSeleccionada(slot.hora)}
                              sx={{ 
                                borderRadius: '6px', fontWeight: 600, fontSize: 11.5,
                                bgcolor: !slot.libre ? '#eee' : (horaSeleccionada === slot.hora ? ACCENT : '#E6F1FB'),
                                color: !slot.libre ? '#aaa' : (horaSeleccionada === slot.hora ? 'white' : NAVY),
                                '&:hover': { bgcolor: slot.libre ? (horaSeleccionada === slot.hora ? ACCENT : SKY) : '#eee' }
                              }} 
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.06)' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                    <Button variant="text" size="medium" sx={{ textTransform: 'none', color: '#666', fontWeight: 600 }} onClick={() => setActiveItem('Inicio')}>Cancelar</Button>
                    <Button variant="contained" size="medium" onClick={handleConfirmarCita} sx={{ bgcolor: ACCENT, textTransform: 'none', borderRadius: 1.5, px: 3, fontWeight: 600, fontSize: 13.5, '&:hover': { bgcolor: '#055466' } }}>
                      Confirmar Turno
                    </Button>
                  </Box>
                </Paper>
              </Box>

            ) : activeItem === 'Mis citas' ? (
              <Box sx={{ width: '100%' }}>
                <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: 2.5, background: `linear-gradient(135deg, ${TEAL} 0%, ${NAVY} 100%)`, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', p: 1, borderRadius: 1.5, display: 'flex' }}><IcoList /></Box>
                  <Box>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Historial de Mis Citas</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.85 }}>Revisa y gestiona tus consultas médicas programadas.</Typography>
                  </Box>
                </Paper>
                
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 3, borderColor: 'rgba(0,0,0,0.08)', bgcolor: 'white', width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
                    {misCitasLista.length === 0 ? (
                      <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography sx={{ color: '#666', fontSize: 14 }}>No registras citas activas en el sistema.</Typography>
                      </Box>
                    ) : (
                      misCitasLista.map((cita) => (
                        <Paper key={cita.id} variant="outlined" sx={{ 
                          width: '100%',
                          boxSizing: 'border-box',
                          borderRadius: 2.5, 
                          p: 2.5, 
                          borderColor: 'rgba(0,0,0,0.1)', 
                          bgcolor: '#fcfcfc', 
                          borderLeft: `5px solid ${ACCENT}`,
                          display: 'flex',
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          transition: '0.2s', '&:hover': { bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }
                        }}>
                          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', flexGrow: 1 }}>
                            <Box sx={{ bgcolor: BEIGE, px: 2, py: 1.5, borderRadius: 2, textAlign: 'center', minWidth: 80 }}>
                              <Typography sx={{ color: NAVY, fontWeight: 800, fontSize: 18, lineHeight: 1 }}>{cita.fecha.split('-')[2] || '15'}</Typography>
                              <Typography sx={{ color: '#888', fontSize: 11, fontWeight: 700, mt: 0.5 }}>FECHA</Typography>
                            </Box>
                            <Box>
                              <Typography sx={{ fontSize: 18, fontWeight: 800, color: NAVY, mb: 0.5 }}>{cita.especialidad}</Typography>
                              <Typography sx={{ fontSize: 13, color: '#666', mb: 1 }}>Motivo: <i>{cita.motivo}</i></Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: TEAL }}><IcoUser/></Avatar>
                                <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{cita.medico}</Typography>
                                <Typography sx={{ fontSize: 12, color: '#999', ml: 0.5 }}>• {cita.paciente}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, minWidth: 120 }}>
                            <Chip label={cita.estado} size="small" sx={{ bgcolor: '#E1F5EE', color: '#0e5e8a', fontSize: 11, fontWeight: 700, borderRadius: 1 }} />
                            <Typography sx={{ fontWeight: 700, color: NAVY, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 15, mt: 0.5 }}>
                              <IcoClock /> {cita.hora}
                            </Typography>
                          </Box>
                        </Paper>
                      ))
                    )}
                  </Box>
                </Paper>
              </Box>

            ) : (
              <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 3, borderColor: 'rgba(0,0,0,0.1)', bgcolor: 'white', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                <Typography sx={{ fontSize: 14, color: '#666' }}>Sección en desarrollo: <strong>{activeItem}</strong></Typography>
                <Button size="medium" sx={{ mt: 1.5, textTransform: 'none', bgcolor: TEAL, color: 'white', '&:hover': { bgcolor: NAVY } }} onClick={() => setActiveItem('Inicio')}>Regresar al Inicio</Button>
              </Paper>
            )}

          </Box>
        </Box>
      </Box>
    </Box>
  );
}   