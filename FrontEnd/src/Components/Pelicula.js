import { faEdit, faTrashAlt, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from "react";




export default function Pelicula(pelicula) {

  const popupRef = useRef(null);
  const inputRef = useRef(null);

  const handleClickOutside = (e) => {

    if (popupRef.current && !popupRef.current.contains(e.target)) {
      inputRef.current.checked = false;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const convertirDatosaImagen = (pelicula) => {
    const { extension, value } = pelicula.imagen;
    const urlImagenBase64 = `data:image/${extension};base64,${value}`;
    return urlImagenBase64;

  }
  const urlImagenSrc = convertirDatosaImagen(pelicula)

  const handleShowDetail = () => {
    pelicula.onShowDetail();
    inputRef.current.checked = false;

  };
  const handleEditMovie = () => {
    pelicula.onEditMovie();
    inputRef.current.checked = false;
  };
  return (

    <div className='card' >
      <div className="card-img-container">
      <img src={urlImagenSrc} className="card-img-top" style={{  width: "100%", height: "200px" }} alt={pelicula.titles} />
      </div>
      <div className="card-body">

        <h4 className="card-title"> {pelicula.titles}</h4>
        <p className="card-text text-secondary">
          {pelicula.description.slice(0, 10)}...
        </p>


        <label className="popup" ref={popupRef}>
          <input type="checkbox" ref={inputRef} />
          <div className="burger" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav class="popup-window">
            <legend>Detalles</legend>
            <ul>

              <li>
                <button onClick={handleShowDetail}> <FontAwesomeIcon icon={faAdd} />Ver Mas</button>
              </li>

              <li>
                <button
                  onClick={handleEditMovie}
                ><FontAwesomeIcon
                    icon={faEdit} />Editar
                </button>
              </li>

              <li>
                <button
                  onClick={() => pelicula.deletePost(pelicula.id)}
                ><FontAwesomeIcon
                    icon={faTrashAlt} />Borrar
                </button>

              </li>
            </ul>
          </nav>
        </label>

      </div>

    </div >

  )
}
