from sqlalchemy import Column, Integer, String, ForeignKey, DataTime
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Medico(Base):
    __tablename__="medicos"
    id=Column(Integer, primary_key=True)
    documento_identidad=Column(Integer, unique=True)
    tarjeta_profesional=Column(String, unique=True)
    nombre_completo=Column(String)
    especialidad=Column(String)
    horario_atencion=Column(String)#Verificar porque no se como se manejan los horarios de los medicos, si es algo fijo al mes/semana o es algo que cambia tipo turnos diarios.
    usuario_id=Column(Integer, ForeignKey('usuarios'))
    usuario = relationship("Usuario", back_populates="medicos")       

    
    def __init__(self, tarjeta_profesional, nombre_completo, especialidad, horario_atencion=None):
        
        self.tarjeta_profesional=tarjeta_profesional
        self.nombre_completo=nombre_completo
        self.especialidad=especialidad
        self.horario_atencion=horario_atencion    

    #id = Column(Integer, primary_key=True)
    #nombre = Column(String(100), nullable=False)
    #cedula = Column(String(20), unique=True, nullable=False)
    #telefono = Column(String(20))