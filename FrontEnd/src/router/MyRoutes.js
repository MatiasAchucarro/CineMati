import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from '../Components/LoginRegister/Login'
import { Register } from '../Components/LoginRegister/Register'
import App from '../App'

export const MyRoutes = () => {
    
  return (
   
       <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/pelicula" element={<App/>} />
      </Routes>
    
    </BrowserRouter>
    
  )
}
