import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const productos = [
  {
    id: "1",
    titulo: "Street Fighter vs Tekken",
    imagen: "/imgs/street x tekken.webp",
    precio: 29990,
  },
  {
    id: "2",
    titulo: "Elden Ring",
    imagen: "/imgs/elden-ring-portada.jpg",
    precio: 29990,
  },
  { id: "3", titulo: "Skyrim", imagen: "/imgs/skyrim.webp", precio: 29990 },
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
    titulo: "Devil My Cry 5",
    imagen: "/imgs/devilmycry.jpg",
    precio: 29990,
  },
  { id: "10", titulo: "Bayonetta", imagen: "/imgs/lamamu.jpg", precio: 29990 },
];
function Productos() {
  const location = useLocation();
  console.log(location);
  const { id } = useParams();

  return (
    <>
      <main>
        <h2 className="titulo-principal">
          Compra los mejores productos al mejor precio!
        </h2>
        <div className="contenedor-producto">
          {productos.map((p) => (
            <ProductoHome
              key={p.id}
              producto={p}
              onAgregarClick={handleAgregar}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Productos;
