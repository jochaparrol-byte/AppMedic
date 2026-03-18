#uvicorn main:app --reload para iniciar el servidor de python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Permiso para que React se conecte sin bloqueos de seguridad
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. El Molde: Define qué tipo de dato esperamos recibir
class DatosPaciente(BaseModel):
    nombre: str

# 2. El Endpoint: La ruta que recibe el dato
@app.post("/api/pacientes")
def registrar_paciente(datos: DatosPaciente):
    # Imprime en la consola de Python para que tú lo veas
    print(f"📡 [SEÑAL RECIBIDA] Dato ingresado: {datos.nombre}")
    
    # Devuelve la confirmación a React
    return {
        "status": "ok", 
        "mensaje": f"El paciente {datos.nombre} fue recibido correctamente por Python."
    }