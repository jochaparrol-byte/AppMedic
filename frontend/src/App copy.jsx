import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function App() {
  // Memoria para la caja de texto
  const [nombrePaciente, setNombrePaciente] = useState("");
  
  // Memoria para el mensaje de confirmación que viene de Python
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

  const enviarDato = async () => {
    // Limpiamos mensajes anteriores
    setMensajeConfirmacion(""); 

    try {
      // 1. Enviamos el dato a Python
      const respuesta = await fetch("http://localhost:8000/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombrePaciente }) // Empaquetamos la variable
      });

      // 2. Leemos la respuesta de Python
      const datosPython = await respuesta.json();

      // 3. Verificamos si Python confirmó la recepción
      if (datosPython.status === "ok") {
        setMensajeConfirmacion(datosPython.mensaje); // Mostramos el mensaje en pantalla
        setNombrePaciente(""); // Borramos la caja de texto para el siguiente uso
      }
    } catch (error) {
      setMensajeConfirmacion("Error: Asegúrate de que el servidor de Python esté encendido.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '50px' }}>
      
      {/* La caja de texto */}
      <TextField 
        label="Nombre del Paciente" 
        variant="outlined"
        value={nombrePaciente}
        onChange={(evento) => setNombrePaciente(evento.target.value)} 
      />

      {/* El botón de envío */}
      <Button 
        variant="contained" 
        onClick={enviarDato}
        disabled={nombrePaciente === ""} // El botón se bloquea si no hay texto
        sx={{ backgroundColor: '#00796b' }}
      >
        Enviar a Python
      </Button>

      {/* La alerta visual (solo aparece si hay un mensaje de confirmación) */}
      {mensajeConfirmacion !== "" && (
        <Alert severity={mensajeConfirmacion.includes("Error") ? "error" : "success"}>
          {mensajeConfirmacion}
        </Alert>
      )}

    </div>
  );
}

export default App;