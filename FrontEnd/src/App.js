
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Agregar from './Components/Movies/Agregar.js';
import Editar from './Components/Movies/Editar.js';
import { ModalCard } from './Components/Common/ModalCard.js';
import { Header } from './Components/Layouts/Header.js';
import { Content } from './Components/Layouts/Content.js';
import { Footer } from './Components/Layouts/Footer.js';
import RestProvider from './Rest/RestProvider.ts';
import toast, { Toaster } from 'react-hot-toast';

const rest = new RestProvider();

function App() {

  const [openModalE, setOpenModalE] = useState(false);
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [movieEdit, setMovieEdit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [search, setSerch] = useState("");



  useEffect(() => {
    toast.success("Bienvenido/a")
    rest.getMovies()
      .then((data) => setPosts(data || []))
  }, []);



  const searcher = (e) => {
    setSerch(e.target.value)
  }
  const results = !search ? posts : posts.filter((pelicula) => pelicula.titles.toLowerCase().includes(search.toLocaleLowerCase()))


  const noResultsMessage = results.length === 0 && search ? (
    <div className='nullPelicula'>
      <p>¡Ups! No encontramos películas con "{search}"</p>
      </div>
  ) : null;



  const deletePost = (id) => {

    const userConfirmed = window.confirm("¿Estás seguro de que deseas borrar esto?");
    if (userConfirmed) {
      rest.deletePost(id)

      setPosts(
        posts.filter((Peliculas) => {
          return Peliculas.id !== id;
        })
      );


    }

  }


  const onEditMovie = (pelicula) => {
    setOpenModalE(true);
    setMovieEdit(pelicula);
  }

  const handleShowDetail = (posts) => {
    setModalContent(posts);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent({});
  };


  return (




    <div className="App-inicio">
      <Toaster />
      <Header setOpenModal={setOpenModal} search={search} searcher={searcher} />
      <Content pelicula={results} deletePost={deletePost} onEditMovie={onEditMovie} handleShowDetail={handleShowDetail} noResultsMessage={noResultsMessage} />
      <ModalCard isOpen={isModalOpen} toggle={handleCloseModal} pelicula={modalContent} />
      {openModal && <Agregar closeModal={setOpenModal} setPosts={setPosts} />}
      {openModalE && < Editar setPosts={setPosts} closeModal={setOpenModalE} movieEdit={movieEdit} />}
      <Footer />

    </div>



  );

}


export default App;
