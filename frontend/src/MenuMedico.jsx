import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  Grid
} from '@mui/material';


const NAVY   = '#2F4156';
const TEAL   = '#567C8D';


const IcoGrid    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/></svg>;
const IcoList    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2h11v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoUser    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoDoc     = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M4 2h7l2 2v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoLogout  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1A6.5 6.5 0 0 0 1 7.5h2a4.5 4.5 0 1 1 4.5 4.5V14A6.5 6.5 0 0 0 7.5 1z" fill="currentColor" opacity="0.4"/><path d="M9.5 7.5L6 5v5l3.5-2.5z" fill="currentColor"/></svg>;
const IcoPill    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 3v9" stroke="currentColor" strokeWidth="1.2"/></svg>;
const IcoChart   = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 13V1h3v12H1zM6 13V5h3v8H6zM11 13V9h3v4h-3z" stroke="currentColor" strokeWidth="1.2"/></svg>;
const IcoStethoscope = () => <svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M4 10v4h8v-4H4z" stroke="#1D9E75" strokeWidth="1.3"/><circle cx="8" cy="6" r="3" stroke="#1D9E75" strokeWidth="1.3"/></svg>;

// menú lateral 
const navSections = [
  {
    label: 'PRINCIPAL',
    items: [{ text: 'Dashboard', icon: <IcoGrid /> }],
  },
  {
    label: 'GESTIÓN',
    items: [
      { text: 'Mi Agenda',        icon: <IcoList /> },
      { text: 'Mis Pacientes',    icon: <IcoUser /> },
      { text: 'Historiales',      icon: <IcoDoc /> },
    ],
  },
  {
    label: 'CLÍNICO',
    items: [
      { text: 'Recetas',          icon: <IcoPill /> },
      { text: 'Reportes',         icon: <IcoChart /> },
    ],
  },
];

// ── Cards de Resumen Médico
const serviceCards = [
  {
    label: 'Pacientes Hoy',
    sub: '12 pacientes programados.',
    bg: '#E1F5EE', 
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" stroke="#1D9E75" strokeWidth="1.3"/>
        <path d="M8 5v3l2 1" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Consultas Activas',
    sub: '3 consultas en curso.',
    bg: '#E6F1FB', 
    icon: <IcoStethoscope />,
  },
  {
    label: 'Resultados Pendientes',
    sub: '5 exámenes de laboratorio.',
    bg: '#FAEEDA', 
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path d="M4 8h8M8 4v8" stroke="#BA7517" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// Lista de Próximos Pacientes 
const patientAppointments = [
  {
    day: 'Hoy', month: '10:00', name: 'Carlos Mendoza',
    spec: 'Motivo: Chequeo general', time: '10:00 am',
    dotBg: '#E1F5EE', dotColor: '#0e5e8a',
    badgeBg: '#E1F5EE', badgeColor: '#1e65b0', status: 'En espera',
  },
  {
    day: 'Hoy', month: '11:30', name: 'María Fernanda Ruiz',
    spec: 'Motivo: Revisión de exámenes', time: '11:30 am',
    dotBg: '#E6F1FB', dotColor: '#185FA5',
    badgeBg: '#FAEEDA', badgeColor: '#566c8b', status: 'Confirmado',
  },
];

export default function MenuMedico() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      bgcolor: '#f5f5f3',
      boxSizing: 'border-box'
    }}>

      {/* TOP BAR */}
      <Box sx={{
        height: 56, bgcolor: 'white', flexShrink: 0,
        borderBottom: '0.5px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: TEAL, borderRadius: '18px' }}>
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M8 2C8 2 4 5 4 9a4 4 0 0 0 8 0c0-4-4-7-4-7z" fill="white" opacity="0.9"/>
              <path d="M6 8h4M8 6v4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Avatar>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: '#111', letterSpacing: '-0.3px' }}>
            Vitalix 
          </Typography>
        </Box>
        <Typography sx={{
          position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
          fontSize: 10, color: '#445ba0', letterSpacing: '1px',
          textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap',
        }}>
          PORTAL MEDICO
        </Typography>
      </Box>

      {/* BODY */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* SIDEBAR */}
        <Box component="nav" sx={{
          width: 200, flexShrink: 0, bgcolor: 'white',
          borderRight: '0.5px solid rgba(0,0,0,0.1)',
          display: 'flex', flexDirection: 'column',
          py: 2, overflowY: 'auto',
        }}>
          {navSections.map((section, si) => (
            <React.Fragment key={section.label}>
              {si > 0 && <Divider sx={{ mx: '12px', my: 1, borderColor: 'rgba(0,0,0,0.08)' }} />}
              <Typography sx={{ px: '12px', pb: 1, pt: si === 0 ? 0 : 1, fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#999' }}>
                {section.label}
              </Typography>
              <List disablePadding>
                {section.items.map(item => {
                  const isActive = activeItem === item.text;
                  return (
                    <ListItem
                      key={item.text}
                      onClick={() => setActiveItem(item.text)}
                      sx={{
                        px: 2, py: '9px', gap: '10px', cursor: 'pointer',
                        borderLeft: isActive ? '2px solid #4f46c5' : '2px solid transparent',
                        bgcolor: isActive ? '#E1F5EE' : 'transparent',
                        color: isActive ? '#3d4c80' : '#555',
                        fontWeight: isActive ? 500 : 400,
                        '&:hover': { bgcolor: '#f5f5f3', color: '#111' },
                        transition: 'all 0.15s',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, color: 'inherit', opacity: isActive ? 1 : 0.7 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 13.5 }} />
                    </ListItem>
                  );
                })}
              </List>
            </React.Fragment>
          ))}

          <Divider sx={{ mx: '12px', my: 1, borderColor: 'rgba(0,0,0,0.08)' }} />

          {/* Opciones de Perfil y Cerrar Sesión */}
          <List disablePadding>
             {[
               { text: 'Mi perfil', icon: <IcoUser /> },
               { text: 'Cerrar sesión', icon: <IcoLogout /> },
             ].map(item => (
                <ListItem key={item.text} sx={{
                    px: 2, py: '9px', gap: '10px', cursor: 'pointer',
                    color: '#555',
                    '&:hover': { bgcolor: '#f5f5f3', color: '#111' },
                }}>
                    <ListItemIcon sx={{ minWidth: 0, color: 'inherit', opacity: 0.7 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 13.5 }} />
                </ListItem>
             ))}
          </List>
        </Box>

        {/* MAIN CONTENT */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Hero Médico (ahora ocupa el 100% del contenedor) */}
          <Box sx={{
            background: 'linear-gradient(135deg, #066c83 0%, #6b8ae8 60%, #47469a 100%)',
            borderRadius: 3, p: '28px 24px', color: 'white', position: 'relative', overflow: 'hidden',
            width: '100%', // Asegura que ocupe el ancho completo disponible
            boxSizing: 'border-box',
            '&::after':  { content: '""', position: 'absolute', right: -20, top: -20,  width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' },
            '&::before': { content: '""', position: 'absolute', right: 40,  bottom: -30, width: 90,  height: 90,  borderRadius: '50%', background: 'rgba(255,255,255,0.05)' },
          }}>
            <Typography sx={{ fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase', opacity: 0.8, mb: 1, fontWeight: 500 }}>
              PANEL DE CONTROL
            </Typography>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
              Dr. Nombre Apellido<br />(Especialidad)
            </Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5, mb: 2, maxWidth: 300 }}>
              Gestiona tus consultas del día, revisa historiales clínicos y administra tus pacientes de forma eficiente.
            </Typography>
            <Button
              startIcon={<IcoGrid />}
              sx={{
                bgcolor: 'white', color: '#3d5b8d', borderRadius: 2,
                px: 2.25, py: 1.125, fontSize: 13, fontWeight: 500,
                textTransform: 'none',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              Ver agenda completa
            </Button>
          </Box>

          {/* Tarjetas de servicios Médico (GRID CORREGIDO: ahora se estira) */}
          <Grid container spacing={1.5}>
            {serviceCards.map(card => (
              <Grid item xs={4} key={card.label}>
                <Paper variant="outlined" sx={{ 
                  borderRadius: 3, 
                  p: 2, 
                  borderColor: 'rgba(0,0,0,0.1)',
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1 
                }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.25 }}>
                    {card.icon}
                  </Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#111', mb: 0.5 }}>{card.label}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>{card.sub}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Próximos pacientes Médico (PAPER CORREGIDO: ahora se estira) */}
          <Paper variant="outlined" sx={{ 
            borderRadius: 3, 
            p: 2, 
            borderColor: 'rgba(0,0,0,0.1)',
            width: '100%', 
            boxSizing: 'border-box'
          }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#111', mb: 1.5 }}>Próximos pacientes en sala</Typography>
            {patientAppointments.map((appt, idx) => (
              <React.Fragment key={appt.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.25 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2,
                    bgcolor: appt.dotBg, color: appt.dotColor,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1 }}>{appt.day}</span>
                    <span style={{ fontSize: 9 }}>{appt.month}</span>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{appt.name}</Typography>
                    <Typography sx={{ fontSize: 11, color: '#666' }}>{appt.spec}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 12, color: '#999' }}>{appt.time}</Typography>
                    <Chip
                      label={appt.status}
                      size="small"
                      sx={{
                        fontSize: 10, height: 20, mt: 0.25,
                        bgcolor: appt.badgeBg, color: appt.badgeColor,
                        fontWeight: 500, borderRadius: '20px',
                      }}
                    />
                  </Box>
                </Box>
                {idx < patientAppointments.length - 1 && (
                  <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)' }} />
                )}
              </React.Fragment>
            ))}
          </Paper>

        </Box>
      </Box>
    </Box>
  );
} 