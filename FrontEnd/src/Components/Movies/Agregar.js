import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestProvider from '../../Rest/RestProvider.ts';
import { Subir } from '../Assets/Subir.jsx';
import './Agregar.css';

const rest = new RestProvider();
export default function AddPost({ closeModal, setPosts }) {

    const [titles, setTitles] = useState('');
    const [description, setDescription] = useState('');
    const [imagen, setImagen] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});



    const fileToBase64 = (imagen, onLoadendedCallback) => {
        const reader = new FileReader();
        const extension = imagen.name.split('.').pop();
        const name = imagen.name;
        reader.onloadend = function () {
            onLoadendedCallback({
                value: reader.result.split(',')[1],
                extension,
                name
            });
        }

        reader.readAsDataURL(imagen);
    }



    const handleImageChange = (e) => {

        fileToBase64(e.target.files[0], (img) => setImagen(img));
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        handleImageChange(e);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const validate = () => {
        const newErrors = {};
        if (!titles) newErrors.titles = 'El título es obligatorio';
        if (!imagen) newErrors.imagen = 'La imagen es obligatoria';
        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            rest.addMovie(titles, description, imagen)
            .then((data) => {
                setPosts((prevPosts) =>
                  [data, ...prevPosts])
              })
            setTitles('');
            setDescription('');
            setImagen();
            closeModal();
        }
    };


    return (
        <div >
            <Modal isOpen >
                <ModalHeader style={{ display: 'block' }}>
                    <Button className='btn btn-danger' style={{ float: 'right' }} onClick={() => closeModal(false)}>x</Button>
                    <br />
                    <h1> Añadir Pelicula</h1>
                </ModalHeader>
                <ModalBody>
                    <form className='entradas-Agregar' onSubmit={handleSubmit}>
                        <div className='form-group'>

                            <label className="custum-file-upload-add" for="file">
                                <div className="icon-subir-imagen">
                                    {!imagePreview ? (<Subir/>
                                    ) : (
                                        <img src={imagePreview} alt="Preview" style={{ height: '140px', width: '200px' }}/>
                                    )}
                                </div>
                                {!imagePreview}
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={handleImageUpload} />
                            </label>

                            {errors.imagen && <span style={{ color: 'red' }}>{errors.imagen}</span>}

                            <br />
                            <label className='titles-agregar'>Nombre de la Pelicula</label>
                            <input
                                className='form-control'
                                type='text' name='titles'
                                value={titles}
                                onChange={(e) => setTitles(e.target.value)}
                            />
                            {errors.titles && <span style={{ color: 'red' }}>{errors.titles}</span>}
                            <br />
                            <label className='description-agregar'>Descripcion de la Pelicula</label>
                            <textarea
                                className='form-control'
                                type='text'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />


                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' className='btn btn-success' onClick={handleSubmit} >Añadir</Button>
                    <Button className='btn btn-danger' onClick={() => closeModal(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}
