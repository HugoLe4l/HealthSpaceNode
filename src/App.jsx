import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'


//Pages
import LoginPage from './pages/Auths/Login/login'
import RegistroPage from './pages/Auths/Registro/registro'
import HomePage from './pages/Home/home';
import AnunciosPage from './pages/Anuncios/anuncio';
import ReservaPage from './pages/Reserva/reserva';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/cadastro' element={<RegistroPage />} />
          <Route path='/anuncios/:CodigoProduto' element={<AnunciosPage/>}/>
          <Route path='/reserva/:CodigoProduto' element={<ReservaPage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
