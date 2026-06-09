#uvicorn main:app --reload para iniciar el servidor de python
from fastapi import FastAPI, HTTPException # <--- Agregado HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import models
from GestorAuth import GestorAuth
from GestorBaseDatos import GestorBaseDatos 
from datetime import datetime # <--- Agregado para manejar fechas

app = FastAPI()

# Permiso para que React se conecte sin bloqueos de seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DatosAcceso(BaseModel):
    usuario: str
    password: str
class DatosRegistro(BaseModel):
    nombres: str
    apellidos: str
    tipodocumento: str
    numerodocumento: int
    fechadenacimiento: str
    sexo: str
    tipodesangre: str
    celular: int
    correo: str
    direccion: str
    ocupacion: str
    parentcontacto: str
    contactoemergencia: str
    numerocontacto: int
    alergia: str
    password: str

@app.post("/api/logeo")
def validar_identidad(datos: DatosAcceso):
    db=GestorBaseDatos()
    auth=GestorAuth(db)

    usuario, mensaje= auth.iniciar_sesion(datos.usuario, datos.password)
    print("Resultado")
    
    if usuario:
        print(f"Bienbenido, {datos.usuario}")
        
    else:
        print("Contrasena incorrecta")
        
    return{
        "logeo": usuario,
        "mensaje": mensaje
    }

@app.post("/api/registro")
def registrar_datos(datos:DatosRegistro):#corregir escritura
    db=GestorBaseDatos()
    auth=GestorAuth(db)
    mensaje=auth.registrar_usuario(datos.correo, datos.password, "paciente", datos)
    print(mensaje)
    usuariollegada=datos.nombres
    print(usuariollegada)
    return{
        "nombrescompletos":usuariollegada
    }

# ==========================================
#   AGREGADO PARA LAS CITAS
# ==========================================
class CitaNueva(BaseModel):
    id_paciente: int
    id_medico: int
    fecha: str  
    hora: str   
    motivo_consulta: str

@app.post("/api/citas/agendar")
def agendar_cita(datos: CitaNueva):
    db = GestorBaseDatos()
    
    try:
        # Combinamos la fecha y la hora en un solo objeto DateTime
        fecha_hora_str = f"{datos.fecha} {datos.hora}"
        fecha_hora_obj = datetime.strptime(fecha_hora_str, "%Y-%m-%d %H:%M")
        
        # Creamos la instancia usando tu modelo
        nueva_cita = models.Citas(
            id_paciente=datos.id_paciente,
            id_medico=datos.id_medico,
            fecha_hora=fecha_hora_obj,
            motivo_consulta=datos.motivo_consulta
        )
        
        # Guardamos en la base de datos (asumiendo que tu Gestor expone 'sesion')
       # db.sesion.add(nueva_cita)
        #db.sesion.commit()
        db.insertar(nueva_cita)
        return {"mensaje": "Cita agendada exitosamente", "estado": "ok"} 
    except Exception as e:
        db.sesion.rollback()
        raise HTTPException(status_code=500, detail=f"Error al guardar la cita: {str(e)}")
    finally:
        db.sesion.close()   