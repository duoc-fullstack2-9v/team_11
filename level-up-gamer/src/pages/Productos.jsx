import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Importa react-toastify
import { useCarrito } from "../context/CarritoContext.jsx"; // ✅ Contexto del carrito

// 🧩 Lista de productos (ejemplo)
const productos = [
  {
    id: "1",
    titulo: "Street Fighter vs Tekken",
    imagen: "/imgs/street x tekken.webp",
    precio: 29990,
  },
  {
    id: "2",
    titulo: "Resident Evil 4 Remake",
    imagen: "/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg",
    precio: 39990,
  },
  {
    id: "2",
    titulo: "Elden Ring",
    imagen: "/imgs/elden-ring-portada.jpg",
    precio: 29990,
  },
  {
    id: "3",
    titulo: "Skyrim",
    imagen: "/imgs/skyrim.webp",
    precio: 29990,
  },
  {
    id: "4",
    titulo: "Red Dead Redemption II",
    imagen: "/imgs/redDead.avif",
    precio: 29990,
  },
  {
    id: "5",
    titulo: "Silent Hill F",
    imagen: "/imgs/silenciogill.png",
    precio: 29990,
  },
  {
    id: "6",
    titulo: "Resident Evil 4",
    imagen: "/imgs/resident-evil-4-hd-proyect-generacionxbox.jpg",
    precio: 29990,
  },
  {
    id: "7",
    titulo: "Resident Evil 7",
    imagen: "/imgs/resident7.avif",
    precio: 29990,
  },
  {
    id: "8",
    titulo: "Bioshock",
    imagen: "/imgs/BioShock_cover.jpg",
    precio: 29990,
  },
  {
    id: "9",
    titulo: "Devil May Cry 5",
    imagen: "/imgs/devilmycry.jpg",
    precio: 29990,
  },
  {
    id: "10",
    titulo: "Bayonetta",
    imagen: "/imgs/lamamu.jpg",
    precio: 29990,
  },
];


// Componente hijo: producto individual
function ProductoHome({ producto, onAgregarClick }) {
  return (
    <div className="producto-home">
      <img
        className="producto-home-imagen"
        src={producto.imagen}
        alt={producto.titulo}
      />
      <div className="producto-detalles-home">
        <h3 className="producto-titulo-home">{producto.titulo}</h3>
        <p className="producto-precio-home">${producto.precio}</p>
        <button
          className="producto-agregar-home"
          onClick={() => onAgregarClick(producto)}
        >
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
      theme: "colored"
    });
  }

  return (
    <>
      <main>
        <h2 className="titulo-principal">
          Compra los mejores productos al mejor precio!
        </h2>

        <div className="contenedor-producto">
          {productos.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            productos.map((p) => (
              <ProductoHome
                key={p.id}
                producto={p}
                onAgregarClick={handleAgregar}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default Productos;
