from models import Usuario, Medico, Paciente, Citas
import bcrypt

#print(bcrypt.__version__)



class GestorAuth:


    def __init__(self, gestor_bd):
        self.db=gestor_bd
    
    def registrar_usuario(self, email, password, rol, datos_perfil):#pensar en como agregar el resto de informacion
        
        password_enc = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  #mas por seguridad que por otra cosa. Se toma la contraseña, se convierte en binario para poder agregar los aditivos de seguridad(simbolos "aleatorios", y un identificador para cada contraseña(asi la contraseña sea igual en dos usuarios, la contraseña se vera diferente) asi como tambien la hace interpretable aunque tenga caracteres especiales como "ñ" y demas) y por ultimo la convierte en un string para que sea posible guardarla en la base de datos sin problema

        try:
            usuario_nuevo=Usuario(email=email, password=password_enc, rol=rol)
            self.db.sesion.add(usuario_nuevo)
            self.db.sesion.flush()

            if rol == 'medico':
                perfil = Medico(
                
                tarjeta_profesional=datos_perfil['tarjeta_profesional'],
                nombre_completo=datos_perfil['nombre_completo'],
                documento_identidad=123456,
                especialidad=datos_perfil['especialidad']
            )
            elif rol == 'paciente':
                perfil = Paciente(
                nombres=datos_perfil.nombres ,
                apellidos=datos_perfil.apellidos,
                tipo_de_documento=datos_perfil.tipodocumento,
                documento_identidad=datos_perfil.numerodocumento,
                fecha_nacimiento=None, #datos_perfil.fechadenacimiento
                genero=datos_perfil.sexo,
                tipo_de_sangre=datos_perfil.tipodesangre,
                celular=datos_perfil.celular,
                correo=datos_perfil.correo,
                direccion_residencia=datos_perfil.direccion,
                ocupacion=datos_perfil.ocupacion,
                parentesco=datos_perfil.parentcontacto,
                contacto_emergencia=datos_perfil.contactoemergencia,
                numero_contacto=datos_perfil.numerocontacto,
                alergias=datos_perfil.alergia,
                usuario=usuario_nuevo
            )
            perfil.usuario_id = usuario_nuevo.id
            self.db.sesion.add(perfil)
            self.db.sesion.commit()
            return "registro exitoso"

        except Exception as error:
            self.db.sesion.rollback()
            print(f"Error durante el registro{error}")
            return "Error al registrar el usuario"
            
        


    def iniciar_sesion(self, correo, contrasena_intento):

        usuario=self.db.obtener_por_columna(Usuario, "email", correo)
        if not usuario:
            return None, "Usuario no fue encontrado"
        
        if usuario.verificar_password(contrasena_intento):
            return usuario, "Logeo exitoso"
        return None, "Credenciales incorrectas"
