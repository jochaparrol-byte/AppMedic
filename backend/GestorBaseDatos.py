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
        self.usuario=os.getenv("DB_USUARIO")
        self.password=os.getenv("DB_PASSWORD")
        self.host=os.getenv("DB_HOST")
        # Guardamos la URL de conexión (fácil de cambiar a AWS luego)
        self.port=os.getenv("DB_PORT")
        self.database_name=os.getenv("DB_NAME")
        self.url = f"postgresql+psycopg2://{self.usuario}:{self.password}@{self.host}:{self.port}/{self.database_name}?sslmode=require"
        
        self.engine = create_engine(self.url)
        
        Base.metadata.create_all(self.engine)

        ClaseSesion=sessionmaker(bind=self.engine)
        self.sesion=ClaseSesion()

        print("✅ Conexión a AWS exitosa.")


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