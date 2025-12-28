import React from 'react';
import { toast } from 'react-toastify'; 
import { useCarrito } from '../context/CarritoContext.jsx'; // 

function ProductoAgregar({ producto }) {
  const { agregarAlCarrito } = useCarrito();

  const handleClick = () => {
    if (!producto) {
      console.error("No se encontró el producto a agregar");
      return;
    }

    agregarAlCarrito(producto);

    toast.success(`¡${producto.titulo} agregado al carrito!`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <button
      className="producto-agregar-home"
      onClick={handleClick}
    >
      Agregar
    </button>
  );
}

export default ProductoAgregar;
