import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalCard.css'

export const ModalCard = ({ isOpen, toggle, pelicula }) => {
    const convertirDatosaImagen = (pelicula) => {
        if (!pelicula || !pelicula.imagen) {
            return '';
        }
        const { extension, value } = pelicula.imagen;
        const urlImagen = `data:image/${extension};base64,${value}`;
        return urlImagen;
    };

    const urlImagenSrcM = convertirDatosaImagen(pelicula);


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader style={{ display: 'block' }}>

                <Button className='btn btn-danger' style={{ float: 'right' }} onClick={toggle}>x</Button>
                <br />
                <h1 className='titleH'>{pelicula.titles}</h1>

            </ModalHeader>
            <ModalBody>
                <div >
                    <img src={urlImagenSrcM} className='card-img-modal' />
             
                </div>
                <br />
                <p>{pelicula.description}</p>
            </ModalBody>
            <ModalFooter>
                <Button className='btn btn-danger' onClick={toggle}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    );


};

