from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker, declarative_base

# La Base constructora se deja afuera de la clase por estándar de SQLAlchemy
Base = declarative_base()

class GestorBaseDatos:
    db_local="sqlite:///mercadolibre_precios.db"

    db= GestorBaseDatos(url_conexion=url_local)
    db_aws=""
    def __init__(self):
        self.usuario="postgres"
        self.password="scraper22sopa"
        self.host="scraper-ml-server.ckh0a0maehqt.us-east-1.rds.amazonaws.com"
        # Guardamos la URL de conexión (fácil de cambiar a AWS luego)
        self.port="5432"
        self.database_name="mercadolibre_db"
        self.url = f"postgresql+psycopg2://{self.usuario}:{self.password}@{self.host}:{self.port}/{self.database_name}?sslmode=require"
        
        self.engine = None
        self.SessionLocal = None

    def conectar(self):
        print(f"📡 Intentando enlace con servidor AWS en {self.host}...")
        
        try:
            # Creamos el motor con la URL de la nube
            self.engine = create_engine(self.url, echo=False)
            
            # Prueba de "Ping" real a la nube
            with self.engine.connect() as conexion:
                print("✅ ¡Conexión exitosa a AWS! El túnel de datos está abierto.")
            
            self.SessionLocal = sessionmaker(bind=self.engine)
            return True
            
        except OperationalError as e:
            print("❌ Error de Conexión: No se pudo alcanzar el servidor de AWS.")
            print("🔍 Tip de ingeniería: Verifica que el 'Security Group' en AWS permita tráfico desde tu IP.")
            print(f"Detalle: {e}")
            return False
    

if __name__ == "__main__":
    db = GestorBaseDatos()
    db.conectar()
