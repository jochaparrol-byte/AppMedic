import bcrypt
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base
#from database import Base # Asumiendo que tu Base viene de tu archivo database.py
Base=declarative_base()


# ==========================================
# 2. CLASE Usuari #Se gestiona el acceso
# ==========================================

class Usuario(Base):
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

    def verificar_password(self, password_plana_intento): #contraseña plana, es la contraseña que ingresa el usuario. se tiene en cuenta que puede tener caracteres especiales y se interpresta con base en utf8 para que no tenga problemas al compararla con un dato almacenado en sql
        return bcrypt.checkpw(
            password_plana_intento.encode('utf-8'), 
            self.password.encode('utf-8') #es la contrasena guardada en la variablse global de la clase password
        )

# ==========================================
# 2. CLASE MEDICO (Perfil)
# ==========================================

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
    citas= relationship("Citas", back_populates="medico")
    
    def __init__(self, tarjeta_profesional, nombre_completo, especialidad, horario_atencion=None):
        
        self.tarjeta_profesional=tarjeta_profesional
        self.nombre_completo=nombre_completo
        self.especialidad=especialidad
        self.horario_atencion=horario_atencion    


# ==========================================
# 2. CLASE PACIENTE (Perfil)
# ==========================================

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


# ==========================================
# 2. CLASE CITAS (Perfil)
# ==========================================

class Citas:
    __tablename__="citas"

    id=Column(Integer, primary_key=True)
    id_paciente=(ForeignKey)#Foreingkey es como relacionar o unir el dato de dos tablas entre si.
    id_medico=Column(ForeignKey)
    fecha_hora=Column(DateTime)
    motivo_consulta=Column(Text)#Text es para textos de tamaño desconocido. Generalmente se usa para textos largos
    diagnostico=Column(Text)
    preescripcion=Column(Text)
    medico=relationship("Medico",back_populates="citas")

    def __init__(self, id_paciente, id_medico, fecha_hora, motivo_consulta, diagnostico=None, preescripcion=None):
        
        self.id_paciente=id_paciente
        self.id_medico=id_medico
        self.fecha_hora=fecha_hora
        self.motivo_consulta=motivo_consulta
        self.diagnostico=diagnostico
        self.preescripcion=preescripcion

