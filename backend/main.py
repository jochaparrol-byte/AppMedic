#uvicorn main:app --reload para iniciar el servidor de python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import models
from GestorAuth import GestorAuth
from GestorBaseDatos import GestorBaseDatos 
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
    