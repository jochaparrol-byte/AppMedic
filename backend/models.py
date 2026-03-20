from GestorBaseDatos import Base
import bcrypt
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base



# ==========================================
# 1. CLASE MEDICO
# ==========================================
class Medico(Base): # <--- (Base) Agregado
    __tablename__ = "medicos"
    id = Column(Integer, primary_key=True)
    documento_identidad = Column(Integer, unique=True)
    tarjeta_profesional = Column(String, unique=True)
    nombre_completo = Column(String)
    especialidad = Column(String)
    horario_atencion = Column(String)
    
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    # IMPORTANTE: back_populates debe coincidir con el nombre en Usuario
    usuario = relationship("Usuario", back_populates="perfil_medico") 
    citas = relationship("Citas", back_populates="medico")
    
    def __init__(self, tarjeta_profesional, nombre_completo,documento_identidad, especialidad, horario_atencion=None):
        self.tarjeta_profesional = tarjeta_profesional
        self.nombre_completo = nombre_completo
        self.especialidad = especialidad
        self.horario_atencion = horario_atencion
        self.documento_identidad=documento_identidad
        

# ==========================================
# 2. CLASE PACIENTE
# ==========================================
class Paciente(Base): # <--- (Base) Agregado (AQUÍ ESTABA EL ERROR)
    __tablename__ = "pacientes"
    
    id = Column(Integer, primary_key=True)
    documento_identidad = Column(Integer, unique=True)
    nombres = Column(String)
    apellidos = Column(String)
    fecha_nacimiento = Column(DateTime)
    genero = Column(String)
    celular = Column(String)
    correo = Column(String)
    rh = Column(String)
    
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    # back_populates debe coincidir con el nombre en Usuario
    usuario = relationship("Usuario", back_populates="perfil_paciente")

# ==========================================
# 3. CLASE CITAS
# ==========================================
class Citas(Base): # <--- (Base) Agregado
    __tablename__ = "citas"

    id = Column(Integer, primary_key=True)
    id_paciente = Column(Integer, ForeignKey('pacientes.id'))
    id_medico = Column(Integer, ForeignKey('medicos.id'))
    fecha_hora = Column(DateTime)
    motivo_consulta = Column(Text)
    diagnostico = Column(Text)
    preescripcion = Column(Text)
    
    medico = relationship("Medico", back_populates="citas")

    def __init__(self, id_paciente, id_medico, fecha_hora, motivo_consulta, diagnostico=None, preescripcion=None):
        self.id_paciente = id_paciente
        self.id_medico = id_medico
        self.fecha_hora = fecha_hora
        self.motivo_consulta = motivo_consulta
        self.diagnostico = diagnostico
        self.preescripcion = preescripcion

# ==========================================
# 4. CLASE USUARIO (Al final para que ya conozca a las otras)
# ==========================================
class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, nullable=False)

    # Estos nombres deben coincidir con el back_populates de arriba
    perfil_medico = relationship("Medico", back_populates="usuario", uselist=False)
    perfil_paciente = relationship("Paciente", back_populates="usuario", uselist=False)

    def __init__(self, email, password, rol):
        self.email = email
        self.password = password
        self.rol = rol

    def verificar_password(self, password_plana_intento):
        return bcrypt.checkpw(
            password_plana_intento.encode('utf-8'), 
            self.password.encode('utf-8')
        )