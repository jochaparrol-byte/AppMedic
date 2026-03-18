from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base
import bcrypt
#print(bcrypt.__version__)

Base=declarative_base()

class GestorAuth:


    def __init__(self, gestor_bd):
        self.db=gestor_bd
    
    