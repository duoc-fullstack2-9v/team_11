import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";

import ProductoAgregar from "../components/AgregaProducto";

// Imágenes
import imgResident from "../assets/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg";
import imgGodofwar from "../assets/imgs/godofwar.jpg";
import imgSilencio from "../assets/imgs/silenciogill.png";
import imgOferta from "../assets/imgs/Oferta semanal.png";
import imgBayoneta from "../assets/imgs/oferta-bayoneta.png";
import imgDmc from "../assets/imgs/dmc-oferta.png";

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("iniciado");
  }, [count]);

  // 👇 Lista de productos en oferta
  const productos = [
    {
      id: 1,
      titulo: "Street Fighter vs Tekken",
      precio: 4990,
      precioAnterior: 29990,
      imagen: imgOferta,
    },
    {
      id: 2,
      titulo: "Bayonetta",
      precio: 4990,
      precioAnterior: 29990,
      imagen: imgBayoneta,
    },
    {
      id: 3,
      titulo: "Devil May Cry 5",
      precio: 4990,
      precioAnterior: 29990,
      imagen: imgDmc,
    },
  ];

  return (
    <>
      

      <main>
        {/* Carrusel */}
        <div className="contenedor-ofertas">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2500"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100 borde-carrusel" src={imgResident} alt="Resident Evil 4" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100 borde-carrusel" src={imgGodofwar} alt="God of War" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100 borde-carrusel" src={imgSilencio} alt="Silent Hill" />
              </div>
            </div>
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
          {productos.map((producto) => (
            <div key={producto.id} className="producto-home">
              <img className="producto-home-imagen" src={producto.imagen} alt={producto.titulo} />
              <div className="producto-detalles-home">
                <h3 className="producto-titulo-home">{producto.titulo}</h3>
                <p className="producto-precio-home">
                  <s>${producto.precioAnterior.toLocaleString()}</s>
                </p>
                <p className="producto-precio-home-oferta">Oferta ${producto.precio.toLocaleString()}</p>
                
                {/* 👇 Usa tu componente con el contexto */}
                <ProductoAgregar producto={producto} />
              </div>
            </div>
          ))}
        </div>
      </main>

      
    </>
  );
}

export default Home;
