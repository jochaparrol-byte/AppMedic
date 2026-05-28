
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegisterUsuario from './RegisterUsuario';
import RegisterMedico from './RegisterMedico';
import Menu from './Menu'
import MenuMedico from './MenuMedico.jsx';

//Aca unicamente nos encargamos de definir el comportamiento de las rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/RegistroUsuario" element={<RegisterUsuario />} />
        <Route path="/RegistroMedico" element={<RegisterMedico/>}/>
        <Route path="/Menu" element={<Menu/>}/>
        <Route path="/MenuMedico" element={<MenuMedico/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;