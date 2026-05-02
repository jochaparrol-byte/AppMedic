from GestorBaseDatos import Base
import bcrypt
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base



class Medico(Base): # <--- (Base) Agregado
    __tablename__ = "medicos"
    id = Column(Integer, primary_key=True)
    documento_identidad = Column(Integer, unique=True)#revisar
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
class Paciente(Base):
    __tablename__ = "pacientes"
    
    id = Column(Integer, primary_key=True)
    nombres = Column(String)
    apellidos = Column(String)
    tipo_de_documento= Column(String)
    documento_identidad = Column(Integer, unique=True)
    fecha_nacimiento = Column(DateTime)
    genero = Column(String)
    tipo_de_sangre= Column(String)
    celular = Column(String)
    correo = Column(String)
    direccion_residencia= Column(String)
    ocupacion= Column(String)
    parentesco= Column(String)
    contacto_emergencia= Column(String)
    numero_contacto= Column(Integer)
    alergias=Column(String)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'))
    # back_populates debe coincidir con el nombre en Usuario
    usuario = relationship("Usuario", back_populates="perfil_paciente")

    def __init__(self, nombres, apellidos, tipo_de_documento, 
                 documento_identidad, fecha_nacimiento, genero, 
                 tipo_de_sangre, celular, correo, direccion_residencia, 
                 ocupacion, parentesco, contacto_emergencia, numero_contacto, alergias, usuario):
        self.nombres=nombres
        self.apellidos=apellidos
        self.tipo_de_documento=tipo_de_documento
        self.documento_identidad=documento_identidad
        self.fecha_nacimiento=fecha_nacimiento
        self.genero=genero
        self.tipo_de_sangre=tipo_de_sangre
        self.celular=celular
        self.correo=correo
        self.direccion_residencia=direccion_residencia
        self.ocupacion=ocupacion
        self.parentesco=parentesco
        self.contacto_emergencia=contacto_emergencia
        self.numero_contacto=numero_contacto
        self.alergias=alergias
        self.usuario=usuario
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
