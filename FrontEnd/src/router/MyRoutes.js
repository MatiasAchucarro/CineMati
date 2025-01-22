import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from '../Components/LoginRegister/Login'
import { Register } from '../Components/LoginRegister/Register'
import App from '../App'
import ProtectedRoute from '../Components/Utils/ProtectedRoute'
import { useLocalStorage } from 'react-use'

export const MyRoutes = () => {
  const [user, setUser]= useLocalStorage('user', null)
    
  return (
   
       <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register/>} />
        <Route element ={<ProtectedRoute canActivate={!!user}/>}>
        <Route path="/pelicula" element={<App/>} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    
  )
}
