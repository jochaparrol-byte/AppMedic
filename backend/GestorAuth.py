from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base
from models import Usuario, Medico, Paciente, Citas
import bcrypt

#print(bcrypt.__version__)

Base=declarative_base()

class GestorAuth:


    def __init__(self, gestor_bd):
        self.db=gestor_bd
    
    def registrar_usuario(self, nombre, especialidad, password):#pensar en como agregar el resto de informacion
        bytes_password=password.encode('utf-8')
        
    def iniciar_sesion(self, correo, contrasena_intento):

        usuario=self.db.obtener_por_columna(Usuario, "email", correo)
        if not usuario:
            return None, "Usuario no fue encontrado"
        
        if usuario.verificar_password(contrasena_intento):
            return usuario, "Logeo exitoso"
        return None, "Credenciales incorrectas"

