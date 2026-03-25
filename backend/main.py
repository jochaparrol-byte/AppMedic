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


class DatosAcceso(BaseModel):
    usuario: str
    password: str


@app.post("/api/logeo")
def validar_identidad(datos: DatosAcceso):
    print(f"El usuario que se ingreso fue: {datos.usuario}")
    print(f"La contraseña que se ingreso fue: {datos.password}")

    return{
        "estado":"exito",
        "mensaje":"credenciales recibidas con exito"
    }