from sqlalchemy import String, Integer, Text, Column, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base

Base=declarative_base()

class Usuario:
    __tablename__="usuarios"

    id= Column(Integer, primary_key=True)
    email= Column(String, unique=True, nullable=False)#un string unico y no puede quedar vacio
    password= Column(String, nullable=False)
    rol= Column(String, nullable=False)#no puede ser vacio porque necesitamos que tenga un rol para saber a que interfaz va a entrar

    perfil_medico = relationship("Medico", back_populates="usuario", uselist=False)
    perfil_paciente = relationship("Paciente", back_populates="usuario", uselist=False)

    
    def __init__(self,email, password, rol):
        
        self.email=email
        self.password=password
        self.rol=rol