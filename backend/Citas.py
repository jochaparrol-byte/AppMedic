from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base

Base=declarative_base()

class Citas:
    __tablename__="citas"

    id=Column(Integer, primary_key=True)
    id_paciente=(ForeignKey)#Foreingkey es como relacionar o unir el dato de dos tablas entre si.
    id_medico=Column(ForeignKey)
    fecha_hora=Column(DateTime)
    motivo_consulta=Column(Text)#Text es para textos de tamaño desconocido. Generalmente se usa para textos largos
    diagnostico=Column(Text)
    preescripcion=Column(Text)

    def __init__(self, id_paciente, id_medico, fecha_hora, motivo_consulta, diagnostico=None, preescripcion=None):
        
        self.id_paciente=id_paciente
        self.id_medico=id_medico
        self.fecha_hora=fecha_hora
        self.motivo_consulta=motivo_consulta
        self.diagnostico=diagnostico
        self.preescripcion=preescripcion

        
    

    