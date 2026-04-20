
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegisterUsuario from './RegisterUsuario';
import RegisterMedico from './RegisterMedico';

//Aca unicamente nos encargamos de definir el comportamiento de las rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/RegistroUsuario" element={<RegisterUsuario />} />
        <Route path="/RegistroMedico" element={<RegisterMedico/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;