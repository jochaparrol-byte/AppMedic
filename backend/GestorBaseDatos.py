from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

# La Base constructora se deja afuera de la clase por estándar de SQLAlchemy
load_dotenv()
Base = declarative_base()

class GestorBaseDatos:
    

    
    def __init__(self):

        entorno=os.getenv("ENTORNO", "local")
        if(entorno=="produccion"): #produccion para que la conexion con la base de datos sea con la base de datos en AWS
            print(" Iniciando en modo PRODUCCION...")
            self.usuario=os.getenv("DB_USUARIO")
            self.password=os.getenv("DB_PASSWORD")
            self.host=os.getenv("DB_HOST")
            
            self.port=os.getenv("DB_PORT")
            self.database_name=os.getenv("DB_NAME")
            self.url = f"postgresql+psycopg2://{self.usuario}:{self.password}@{self.host}:{self.port}/{self.database_name}?sslmode=require"
        else: #cuando diga local la conexion se realizara con la bd de prueba, la local
            print("Iniciando en modo LOCAL (SQLite)...")
            
            self.url = "sqlite:///base_datos_pruebas.db"
        
        self.engine = create_engine(self.url) #el engine sera por asi decirlo el mayordomo y traductor a la vez. Estamos dando ordenes con python a una base de datos que generalmente esta en "lenguaje" sql, por lo cual necesita traduccion. Asi como tambien sirve como sala donde esperaran su turno para que el mayordomo lleve las solicitudes que haremos
        
        Base.metadata.create_all(self.engine)

        ClaseSesion=sessionmaker(bind=self.engine)
        self.sesion=ClaseSesion() #sesion somos nosotros, le estamos diciendo al mayordomo: "oye, necesito que hagas algo por mi"

        print("Conexión a AWS exitosa.")


    def insertar(self, objeto):
        self.sesion.add(objeto)
        self.sesion.commit()
        print(f"Registro insertado: {objeto}")
    
    def obtener_por_columna(self, modelo, nombre_columna, valor_a_buscar):
        columna_exacta=getattr(modelo, nombre_columna)
        return self.sesion.query(modelo).filter(columna_exacta==valor_a_buscar).first()
    
    def cerrar_sesion(self):
        self.sesion.close()
        print("Sesion cerrada") 