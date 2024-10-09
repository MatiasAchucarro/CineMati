import React from 'react'
import { Logo } from '../assets/Logo'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Lupa } from '../assets/Lupa'

export const Header = ({setOpenModal, search, searcher}) => {
  return (

    <header className='header'>
      <div className="header-left">
        <Logo className="logo" />
        <h1 className="movie-title"> CineMati </h1>
      </div>

      <div className="header-center">
        <button className='btn btn-info' onClick={() => { setOpenModal(true); }}>  
          Agregar Peliculas  <FontAwesomeIcon icon={faAdd} /> 
        </button>
      </div>

      <div className="header-right">
        <div className="group">
          <Lupa />
          <input value={search} onChange={searcher} placeholder="Buscar" type="search" className="input" />
        </div>
      </div>

    
    </header>
)
}
