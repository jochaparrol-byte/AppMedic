from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base= declarative_base()

class Paciente:

    __tablename__="pacientes"
    
    id=Column(Integer, primary_key=True)
    documento_identidad=Column(Integer, unique=True)#primary_key es el ancla de busqueda de un elemento de la tabla(lo puede ser la cedula o un numero unico de "iddentificacion" de las eps pero para generalizar usamos solo la cedula)
    #aca va lo del posible nucleo familiar(aun no se como hacer la division)
    nombres=Column(String)
    apellidos=Column(String)
    fecha_nacimiento=Column(DateTime)#Calcular la edad. Verificar si el tipo de variable es el correcto
    genero=Column(String)
    celular=Column(String)
    correo=Column(String)
    rh=Column(String)
    usuario_id = Column(Integer, ForeignKey('usuarios'))
    usuario = relationship("Usuario", back_populates="pacientes")
    