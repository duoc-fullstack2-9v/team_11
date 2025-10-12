import { useLocation, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const productos = [ /* tu array de productos */ ];

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

  function handleAgregar(producto) {
    console.log("Agregado:", producto.titulo);
  }

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
