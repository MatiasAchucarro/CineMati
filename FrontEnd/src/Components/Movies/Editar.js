import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestProvider from '../../Rest/RestProvider.ts';
import './Editar.css'
const rest = new RestProvider();
export default function EditPut({ closeModal, setPosts, movieEdit }) {

    const [titles, setTitles] = useState(movieEdit.titles);
    const [description, setDescription] = useState(movieEdit.description);
    const [imagen, setImagen] = useState(movieEdit.imagen);
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
        fileToBase64(e.target.files[0], (img) => setImagen({ value: img.value }));
    }



    const convertirDatosaImagen = (movieEdit) => {
        const { extension, value } = movieEdit.imagen;
        const urlImagenBase64 = `data:image/${extension};base64,${value}`;
        return urlImagenBase64;

    }
    const urlImagenSrc = convertirDatosaImagen(movieEdit)


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        handleImageChange(e);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const validate = () => {
        const newErrors = {};
        if (!titles.trim()) newErrors.titles = 'El título es obligatorio';
        return newErrors;
    }

    const handleSave = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            rest.editMovie(movieEdit.id, titles, description, imagen)

            setPosts(prevPosts => {
                const newPosts = [...prevPosts];
                const index = newPosts.findIndex(post => post.id === movieEdit.id);
                if (index !== -1) {
                    newPosts[index].titles = titles;
                    newPosts[index].description = description;
                    newPosts[index].imagen = imagen;
                }
                return newPosts;
            });
            setTitles('');
            setDescription('');
            setImagen();
            closeModal();
        }
    };

    return (



        <div >
            <Modal isOpen  >
                <ModalHeader style={{ display: 'block' }}>
                    <Button className='btn btn-danger' style={{ float: 'right' }} onClick={() => closeModal(false)}>x</Button>
                    <br />
                    <h1>Editar Pelicula</h1>

                </ModalHeader>
                <ModalBody>

                    <div className='form-group'>

                        <label className="custum-file-upload" for="file">
                            <div className="icon-editar">
                                {!imagePreview ? (<img src={urlImagenSrc} style={{ height: '140px', width: '200px' }} />
                                ) : (
                                    <img src={imagePreview} alt="Preview" style={{ height: '140px', width: '200px' }} />
                                )}
                            </div>
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                onChange={handleImageUpload} />
                        </label>
                        <br />
                        <label className='titles-editar'>Nombre de la Pelicula</label>
                        <input
                            className='form-control'
                            type='text'
                            name='titles'
                            value={titles}
                            onChange={(e) => setTitles(e.target.value)}
                        />
                        {errors.titles && <span style={{ color: 'red' }}>{errors.titles}</span>}
                        <br />
                        <label className='description-editar'>Descripcion de la Pelicula</label>
                        <textarea
                            className='form-control'
                            type='text'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' className='btn btn-success' onClick={handleSave}>Completado</Button>
                    <Button className='btn btn-danger' onClick={() => closeModal(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>

    )
}