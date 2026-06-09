import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  Grid, TextField, MenuItem 
} from '@mui/material';

// ── Colores 
const NAVY   = '#2F4156';
const TEAL   = '#567C8D';
const SKY    = '#C8D9E6';
const BEIGE  = '#f1edea';
const ACCENT = '#066c83';

// ── Íconos SVG 
const IcoGrid    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/></svg>;
const IcoCalPlus = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><rect x="1" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v2M10 1v2M1 6h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4 9h2M4 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoClock   = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoList    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M2 2h11v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoUser    = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoDoc     = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M4 2h7l2 2v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoLogout  = () => <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M7.5 1A6.5 6.5 0 0 0 1 7.5h2a4.5 4.5 0 1 1 4.5 4.5V14A6.5 6.5 0 0 0 7.5 1z" fill="currentColor" opacity="0.4"/><path d="M9.5 7.5L6 5v5l3.5-2.5z" fill="currentColor"/></svg>;
const IcoCal     = () => <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#0F6E56" strokeWidth="1.2"/><path d="M4.5 1v2M9.5 1v2M1 6h12" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── SECCIONES DE NAVEGACIÓN MÉDICA ──────────────────────────────────────
const navSections = [
  { label: 'Principal', items: [{ text: 'Ir a inicio', icon: <IcoGrid /> }] },
  { label: 'Gestión', items: [
      { text: 'Mi agenda', icon: <IcoCalPlus /> },
      { text: 'Mis pacientes', icon: <IcoUser /> },
    ]
  },
  { label: 'Clínico', items: [
      { text: 'Historias clínicas', icon: <IcoDoc /> },
      { text: 'Recetas', icon: <IcoList /> },
    ]
  },
];

const actionCards = [
  { label: 'Ver Agenda', sub: 'Revisar turnos de hoy.', bg: '#E1F5EE', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" stroke="#1D9E75" strokeWidth="1.3"/><path d="M8 5v3l2 1" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: 'Pacientes', sub: 'Directorio clínico.', bg: '#E6F1FB', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><circle cx="8" cy="5" r="2.5" stroke="#378ADD" strokeWidth="1.5"/><path d="M3 13c0-2.5 2.5-4.5 5-4.5s5 2 5 4.5" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: 'Emitir Receta', sub: 'Crear nueva receta médica.', bg: '#FAEEDA', icon: <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 2h8v12H4z" stroke="#BA7517" strokeWidth="1.3"/><path d="M6 6h4M6 9h3" stroke="#BA7517" strokeWidth="1.3" strokeLinecap="round"/></svg> },
];

export default function DashboardMedico() {
  const [activeItem, setActiveItem] = useState('Ir a inicio');
  
  const [misCitasLista] = useState([
    {
      id: 1, paciente: 'Roberto Gómez', tipo: 'Consulta General',
      fecha: '2026-06-15', hora: '10:30 AM',
      motivo: 'Revisión resultados de laboratorio', estado: 'Confirmada'
    },
    {
      id: 2, paciente: 'Ana Laura Mendieta', tipo: 'Seguimiento',
      fecha: '2026-06-15', hora: '11:30 AM',
      motivo: 'Control de presión arterial', estado: 'En sala de espera'
    }
  ]);

  return (
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
            Vitalix <small style={{fontSize: '12px', fontWeight: 400}}>Portal Médico</small>
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

        {/* AREA PRINCIPAL */}
        <Box component="main" sx={{ flexGrow: 1, width: 'calc(100% - 220px)', overflowY: 'auto' }}>
          
          <Box sx={{ width: '90%', maxWidth: '1100px', minWidth: '700px', margin: '0 auto', py: 4, display: 'flex', flexDirection: 'column' }}>
            
            {activeItem === 'Ir a inicio' ? (
              <Box sx={{ width: '100%' }}>
                {/* HERO BANNER */}
                <Box sx={{ background: 'linear-gradient(135deg, #066c83 0%, #6b8ae8 60%, #47469a 100%)', borderRadius: 3, p: 3, color: 'white', mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', opacity: 0.9, mb: 1, fontWeight: 600 }}>Panel de Control</Typography>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, mb: 1, lineHeight: 1.2 }}>Dr. Martínez <small style={{fontSize: '16px'}}>(Especialidad)</small></Typography>
                  <Typography sx={{ fontSize: 14, opacity: 0.9, mb: 2.5, maxWidth: 450 }}>Gestiona tus consultas del día, revisa historias clínicas y administra tus pacientes de forma eficiente.</Typography>
                  <Button startIcon={<IcoCal />} onClick={() => setActiveItem('Mi agenda')} sx={{ bgcolor: 'white', color: '#3d5b8d', borderRadius: 2, px: 2.5, py: 1, fontSize: 13, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#f0f0f0' } }}>
                    Ver agenda completa
                  </Button>
                </Box>

                {/* TARJETAS DE ACCIÓN: AHORA OCUPAN TODO EL ANCHO */}
                <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                  {actionCards.map(card => (
                    <Paper 
                      key={card.label}
                      elevation={0} 
                      onClick={() => card.label === 'Ver Agenda' && setActiveItem('Mi agenda')}
                      sx={{ 
                        flex: 1, 
                        borderRadius: 2.5, 
                        p: 2.5, 
                        border: '1px solid rgba(0,0,0,0.08)', 
                        cursor: 'pointer', 
                        transition: 'all 0.2s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
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

            ) : activeItem === 'Mi agenda' ? (
              <Box sx={{ width: '100%' }}>
                <Paper elevation={0} sx={{ p: 2, mb: 2.5, borderRadius: 2.5, background: `linear-gradient(135deg, ${TEAL} 0%, ${NAVY} 100%)`, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', p: 1, borderRadius: 1.5, display: 'flex' }}><IcoList /></Box>
                  <Box>
                    <Typography sx={{ fontSize: 16, fontWeight: 600 }}>Mi Agenda de Hoy</Typography>
                    <Typography sx={{ fontSize: 12, opacity: 0.85 }}>Listado de pacientes programados para consulta hoy.</Typography>
                  </Box>
                </Paper>
                
                <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 3, borderColor: 'rgba(0,0,0,0.08)', bgcolor: 'white', width: '100%', boxSizing: 'border-box' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}>
                    {misCitasLista.map((cita) => (
                      <Paper key={cita.id} variant="outlined" sx={{ 
                        width: '100%', boxSizing: 'border-box', borderRadius: 2.5, p: 2.5, borderColor: 'rgba(0,0,0,0.1)', bgcolor: '#fcfcfc', borderLeft: `5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: '0.2s', '&:hover': { bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }
                      }}>
                        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', flexGrow: 1 }}>
                          <Box sx={{ bgcolor: BEIGE, px: 2, py: 1.5, borderRadius: 2, textAlign: 'center', minWidth: 80 }}>
                            <Typography sx={{ color: NAVY, fontWeight: 800, fontSize: 18, lineHeight: 1 }}>{cita.hora.split(' ')[0]}</Typography>
                            <Typography sx={{ color: '#888', fontSize: 11, fontWeight: 700, mt: 0.5 }}>{cita.hora.split(' ')[1]}</Typography>
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: 18, fontWeight: 800, color: NAVY, mb: 0.5 }}>{cita.paciente}</Typography>
                            <Typography sx={{ fontSize: 13, color: '#666', mb: 1 }}>Motivo: <i>{cita.motivo}</i></Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, bgcolor: TEAL }}><IcoDoc/></Avatar>
                              <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{cita.tipo}</Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, minWidth: 120 }}>
                          <Chip label={cita.estado} size="small" sx={{ bgcolor: cita.estado === 'En sala de espera' ? '#FAEEDA' : '#E1F5EE', color: cita.estado === 'En sala de espera' ? '#BA7517' : '#0e5e8a', fontSize: 11, fontWeight: 700, borderRadius: 1 }} />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              </Box>

            ) : (
              <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 3, borderColor: 'rgba(0,0,0,0.1)', bgcolor: 'white', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                <Typography sx={{ fontSize: 14, color: '#666' }}>Sección en desarrollo: <strong>{activeItem}</strong></Typography>
                <Button size="medium" sx={{ mt: 1.5, textTransform: 'none', bgcolor: TEAL, color: 'white', '&:hover': { bgcolor: NAVY } }} onClick={() => setActiveItem('Ir a inicio')}>Regresar al Inicio</Button>
              </Paper>
            )}

          </Box>
        </Box>
      </Box>
    </Box>
  );
} 