import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("iniciado");
  }, [count]);

  return (
    <>
      <main>
        <div className="contenedor-ofertas">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2500"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100 borde-carrusel"
                  src="/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100 borde-carrusel"
                  src="/imgs/godofwar.jpg"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100 borde-carrusel"
                  src="/imgs/silenciogill.png"
                  alt="Third slide"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="contenedor-buscar">
         <i className="bi bi-search"></i>
          <input className="text" type="text" placeholder="Buscar en la tienda" />
        </div>

        <h2 className="titulo-ofertas">Ofertas semanales</h2>

        {/* Productos */}
        <div className="contenedor-producto-home">
          <div className="producto-home">
            <img
              className="producto-home-imagen"
              src="/imgs/Oferta semanal.png"
              alt=""
            />
            <div className="producto-detalles-home">
              <h3 className="producto-titulo-home">Street Fighter vs Tekken</h3>
              <p className="producto-precio-home"> ̶$̶2̶9̶.̶9̶9̶0̶</p>
              <p className="producto-precio-home-oferta">Oferta $4.990</p>
              <button className="producto-agregar-home">Agregar</button>
            </div>
          </div>

          <div className="producto-home">
            <img
              className="producto-home-imagen"
              src="/imgs/oferta-bayoneta.png"
              alt=""
            />
            <div className="producto-detalles-home">
              <h3 className="producto-titulo-home">Bayonetta</h3>
              <p className="producto-precio-home"> ̶$̶2̶9̶.̶9̶9̶0̶</p>
              <p className="producto-precio-home-oferta">Oferta $4.990</p>
              <button className="producto-agregar-home">Agregar</button>
            </div>
          </div>

          <div className="producto-home">
            <img
              className="producto-home-imagen"
              src="/imgs/dmc-oferta.png"
              alt=""
            />
            <div className="producto-detalles-home">
              <h3 className="producto-titulo-home">Devil my cry 5</h3>
              <p className="producto-precio-home"> ̶$̶2̶9̶.̶9̶9̶0̶</p>
              <p className="producto-precio-home-oferta">Oferta $4.990</p>
              <button className="producto-agregar-home">Agregar</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
