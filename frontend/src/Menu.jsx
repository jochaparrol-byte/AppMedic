import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Button, Paper, Chip,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  Card, CardContent, Grid
} from '@mui/material';

// ── Colores del proyecto ──────────────────────────────────────────
const NAVY   = '#2F4156';
const TEAL   = '#567C8D';
const SKY    = '#C8D9E6';
const BEIGE  = '#f1edea';
const ACCENT = '#066c83';

// ── Íconos SVG inline ────────────────────────────────────────────
const IcoGrid    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/></svg>;
const IcoCalPlus = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v2M10 1v2M1 6h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M4 9h2M4 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoClock   = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoList    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2h11v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h5M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoUser    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoStar    = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5l1.9 3.8 4.2.6-3 2.95.7 4.15L7.5 11l-3.8 2L4.4 8.85 1.4 5.9l4.2-.6L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>;
const IcoFlask   = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2a5.5 5.5 0 1 0 0 11A5.5 5.5 0 0 0 7.5 2z" stroke="currentColor" strokeWidth="1.2"/><path d="M7.5 5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoDoc     = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M4 2h7l2 2v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
const IcoLogout  = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1A6.5 6.5 0 0 0 1 7.5h2a4.5 4.5 0 1 1 4.5 4.5V14A6.5 6.5 0 0 0 7.5 1z" fill="currentColor" opacity="0.4"/><path d="M9.5 7.5L6 5v5l3.5-2.5z" fill="currentColor"/></svg>;
const IcoCal     = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#0F6E56" strokeWidth="1.2"/><path d="M4.5 1v2M9.5 1v2M1 6h12" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round"/></svg>;

// ── Secciones del sidebar ────────────────────────────────────────
const navSections = [
  {
    label: 'Principal',
    items: [{ text: 'Inicio', icon: <IcoGrid /> }],
  },
  {
    label: 'Citas',
    items: [
      { text: 'Agendar cita',     icon: <IcoCalPlus /> },
      { text: 'Reprogramar cita', icon: <IcoClock />   },
      { text: 'Mis citas',        icon: <IcoList />    },
      { text: 'Médicos',          icon: <IcoUser />    },
    ],
  },
  {
    label: 'Servicios',
    items: [
      { text: 'Urgencias 24/7',   icon: <IcoStar />  },
      { text: 'Laboratorio',      icon: <IcoFlask /> },
      { text: 'Historial médico', icon: <IcoDoc />   },
    ],
  },
];

// ── Cards de servicios ───────────────────────────────────────────
const serviceCards = [
  {
    label: 'Urgencias 24/7',
    sub: 'Atención inmediata todos los días del año.',
    bg: '#E1F5EE',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" stroke="#1D9E75" strokeWidth="1.3"/>
        <path d="M8 5v3l2 1" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Cardiología',
    sub: 'Centro avanzado en diagnóstico cardíaco.',
    bg: '#E6F1FB',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path d="M4 8h8M8 4v8" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Maternidad',
    sub: 'Cuidado integral para mamá y bebé.',
    bg: '#FAEEDA',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <circle cx="8" cy="6" r="3" stroke="#BA7517" strokeWidth="1.3"/>
        <path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#BA7517" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ── Próximas citas ───────────────────────────────────────────────
const appointments = [
  {
    day: '14', month: 'ABR', name: 'Dra. Lucía Herrera',
    spec: 'Medicina general', time: '10:30 am',
    dotBg: '#E1F5EE', dotColor: '#0e5e8a',
    badgeBg: '#E1F5EE', badgeColor: '#1e65b0', status: 'Confirmada',
  },
  {
    day: '18', month: 'ABR', name: 'Dr. Andrés Mora',
    spec: 'Cardiología', time: '2:00 pm',
    dotBg: '#E6F1FB', dotColor: '#185FA5',
    badgeBg: '#FAEEDA', badgeColor: '#566c8b', status: 'Pendiente',
  },
];

// ════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('Inicio');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f5f5f3' }}>

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
          Salud y bienestar integral
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

          {[
            { text: 'Mi perfil',     icon: <IcoUser />   },
            { text: 'Cerrar sesión', icon: <IcoLogout /> },
          ].map(item => {
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
        </Box>

        {/* MAIN */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Hero */}
          <Box sx={{
            background: 'linear-gradient(135deg, #066c83 0%, #6b8ae8 60%, #47469a 100%)',
            borderRadius: 3, p: '28px 24px', color: 'white', position: 'relative', overflow: 'hidden',
            '&::after':  { content: '""', position: 'absolute', right: -20, top: -20,  width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' },
            '&::before': { content: '""', position: 'absolute', right: 40,  bottom: -30, width: 90,  height: 90,  borderRadius: '50%', background: 'rgba(255,255,255,0.05)' },
          }}>
            <Typography sx={{ fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase', opacity: 0.8, mb: 1, fontWeight: 500 }}>
              Bienvenido
            </Typography>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
              Tu salud en<br />manos expertas
            </Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5, mb: 2, maxWidth: 280 }}>
              Atención médica integral, tecnología de vanguardia y un equipo comprometido con tu bienestar.
            </Typography>
            <Button
              startIcon={<IcoCal />}
              sx={{
                bgcolor: 'white', color: '#3d5b8d', borderRadius: 2,
                px: 2.25, py: 1.125, fontSize: 13, fontWeight: 500,
                textTransform: 'none',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              Agendar cita médica
            </Button>
          </Box>

          {/* Tarjetas de servicios */}
          <Grid container spacing={1.5}>
            {serviceCards.map(card => (
              <Grid item xs={4} key={card.label}>
                <Paper variant="outlined" sx={{ borderRadius: 3, p: 2, borderColor: 'rgba(0,0,0,0.1)' }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.25 }}>
                    {card.icon}
                  </Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#111', mb: 0.5 }}>{card.label}</Typography>
                  <Typography sx={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>{card.sub}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Próximas citas */}
          <Paper variant="outlined" sx={{ borderRadius: 3, p: 2, borderColor: 'rgba(0,0,0,0.1)' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#111', mb: 1.5 }}>Próximas citas</Typography>
            {appointments.map((appt, idx) => (
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
                {idx < appointments.length - 1 && (
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