import models

from GestorBaseDatos import GestorBaseDatos
from GestorAuth import GestorAuth

def probar_sistema():
    # Al momento de llamar a GestorBD(), Base.metadata ya tiene 
    # la info de Usuario, Medico, etc., gracias al paso 1.
    db = GestorBaseDatos() 
    auth = GestorAuth(db)
    
    # ... resto de tu código
    print("--- 🛠️  Preparando Base de Datos ---")
    

    # 2. Datos de prueba
    email_test = "sofia@email.com"
    pass_test = "sofia12ss"
    datos_perfil = {
        'tarjeta_profesional': 'MS-98765',
        'nombre_completo': 'sofia contreras',
        'especialidad': 'doctor'
        
    }
    
    # 3. Registro
    print("\n--- 📝 Registrando Usuario ---")
    # Primero verificamos si ya existe para no duplicar en la prueba
    existente = db.obtener_por_columna(models.Usuario, "email", email_test)
    if not existente:
        resultado = auth.registrar_usuario(email_test, pass_test, 'medico', datos_perfil)
        print(resultado)
    else:
        print("⚠️ El usuario ya existe, procedemos al login.")

    # 4. Prueba de Login Exitoso
    print("\n--- 🔑 Probando Login CORRECTO ---")
    user, mensaje = auth.iniciar_sesion(email_test, pass_test)
    print(f"Resultado: {mensaje}")
    if user:
        print(f"✅ Bienvenida confirmada para: {user.email} (Rol: {user.rol})")
    else:
        print("\n--- ❌ Probando Login INCORRECTO ---")
        user_fail, mensaje_fail = auth.iniciar_sesion(email_test, "password_incorrecta")
        print(f"Resultado esperado: {mensaje_fail}")
    # 5. Prueba de Login Fallido
    

    # 6. Limpieza
    db.cerrar_sesion()

if __name__ == "__main__":
    probar_sistema()