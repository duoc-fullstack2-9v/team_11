import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="wrapper">
        <main>
            <div className="contenedor-ofertas">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" data-interval="2500">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 borde-carrusel"
                                src="./imgs/resident-evil-4-hd-proyect-generacionxbox.jpg" alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 borde-carrusel" src="./imgs/godofwar.jpg" alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 borde-carrusel" src="./imgs/silenciogill.png" alt="Third slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            </div>
            <div className="contenedor-buscar">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar en la tienda"/>

            </div>
            <h2 className="titulo-ofertas">Ofertas semanales</h2>


            <div className="contenedor-producto-home">
                <div className="producto-home">
                    <img className="producto-home-imagen" src="./imgs/Oferta semanal.png" alt=""/>
                    <div className="producto-detalles-home">
                        <h3 className="producto-titulo-home">Street Fighter vs Tekken</h3>
                        <p className="producto-precio-home">$2̶9̶9̶9̶0̶</p>
                        <p className="producto-precio-home-oferta">Oferta $4.990</p>
                        <button className="producto-agregar-home">Agregar</button>
                    </div>
                </div>
                <div className="producto-home">
                    <img className="producto-home-imagen" src="./imgs/oferta-bayoneta.png" alt=""/>
                    <div className="producto-detalles-home">
                        <h3 className="producto-titulo-home">Bayonetta</h3>
                        <p className="producto-precio-home">$2̶9̶9̶9̶0̶</p>
                        <p className="producto-precio-home-oferta">Oferta $4.990</p>
                        <button className="producto-agregar-home">Agregar</button>
                    </div>
                </div>
                <div className="producto-home">
                    <img className="producto-home-imagen" src="./imgs/dmc-oferta.png" alt=""/>
                    <div className="producto-detalles-home">
                        <h3 className="producto-titulo-home">Devil my cry 5</h3>
                        <p className="producto-precio-home">$2̶9̶9̶9̶0̶</p>
                        <p className="producto-precio-home-oferta">Oferta $4.990</p>
                        <button className="producto-agregar-home">Agregar</button>
                    </div>
                </div>
            </div>


        </main>

    </div>

    </>
  )
}

export default Home
