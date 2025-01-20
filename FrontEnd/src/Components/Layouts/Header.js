import React from 'react'
import { Logo } from '../Assets/Logo'
import { Lupa } from '../Assets/Lupa'
import './Header.css'
import { AgregarMas } from '../Assets/AgegarMas'
export const Header = ({ setOpenModal, search, searcher }) => {
  return (

    <header className='header-peliculas'>
      <div className="header-left">
        <Logo className="logo" />
      </div>

      <div className="header-center">

      <div className="container-search">
          <input value={search} onChange={searcher} type="text" name="text" className="input" placeholder="Buscar"/>
            <button className="search-btn">
              <Lupa />
            </button>
          
        </div>
        
      </div>

      <div className="header-right">
      <button className="button-Agregar-peli" type="button" onClick={() => { setOpenModal(true); }}>
          <span className="button-text">Agregar Pelicula </span>
          <AgregarMas/>
        </button>

      </div>


    </header>
  )
}
