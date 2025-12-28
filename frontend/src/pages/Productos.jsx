import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCarrito } from "../context/CarritoContext.jsx";


import imgStreet from "../assets/imgs/street x tekken.webp";
import imgResident4 from "../assets/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg";
import imgElden from "../assets/imgs/elden-ring-portada.jpg";
import imgSkyrim from "../assets/imgs/skyrim.webp";
import imgRedDead from "../assets/imgs/redDead.avif";
import imgSilent from "../assets/imgs/silenciogill.png";
import imgResident7 from "../assets/imgs/resident7.avif";
import imgBioShock from "../assets/imgs/BioShock_cover.jpg";
import imgDevil from "../assets/imgs/devilmycry.jpg";
import imgBayonetta from "../assets/imgs/lamamu.jpg";
import { useEffect, useState } from "react";
import { listarProductos } from "../services/productoService.jsx";

// Lista de productos
/*const productos = [
  { id: "1", titulo: "Street Fighter vs Tekken", imagen: imgStreet, precio: 29990 },
  { id: "2", titulo: "Resident Evil 4 Remake", imagen: imgResident4, precio: 39990 },
  { id: "3", titulo: "Elden Ring", imagen: imgElden, precio: 29990 },
  { id: "4", titulo: "Skyrim", imagen: imgSkyrim, precio: 29990 },
  { id: "5", titulo: "Red Dead Redemption II", imagen: imgRedDead, precio: 29990 },
  { id: "6", titulo: "Silent Hill F", imagen: imgSilent, precio: 29990 },
  { id: "7", titulo: "Resident Evil 4", imagen: imgResident4, precio: 29990 },
  { id: "8", titulo: "Resident Evil 7", imagen: imgResident7, precio: 29990 },
  { id: "9", titulo: "Bioshock", imagen: imgBioShock, precio: 29990 },
  { id: "10", titulo: "Devil May Cry 5", imagen: imgDevil, precio: 29990 },
  { id: "11", titulo: "Bayonetta", imagen: imgBayonetta, precio: 29990 },
];*/

// Componente hijo: producto individual
function ProductoHome({ producto, onAgregarClick }) {
  return (
    <div className="producto-home">
      <img className="producto-home-imagen" src={producto.imagen} alt={producto.titulo} />
      <div className="producto-detalles-home">
        <h3 className="producto-titulo-home">{producto.titulo}</h3>
        <p className="producto-precio-home">${producto.precio}</p>
        <button className="producto-agregar-home" onClick={() => onAgregarClick(producto)}>
          Agregar
        </button>
      </div>
    </div>
  );
}

function Productos() {
  const location = useLocation();
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const [productos, setProductos] = useState([]);

  function handleAgregar(producto) {
    agregarAlCarrito(producto);
    toast.success(`🛒 ¡${producto.titulo} agregado al carrito!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  useEffect(() => {
    const fetchData = async () => {

      console.log("Fetching products from API...");
      const data = await listarProductos();
      console.log("Products fetched: ", data);
      setProductos(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      <h2 className="titulo-principal">
        ¡Compra los mejores productos al mejor precio!
      </h2>

      <div className="contenedor-producto">
        {productos.length === 0 && <p>No hay productos disponibles</p>}

        {productos.length > 0 &&
          productos.map((p) => (
            <ProductoHome
              key={p.id}
              producto={p}
              onAgregarClick={handleAgregar}
            />
          ))
        }

      </div>
    </main>
  );
}

export default Productos;
